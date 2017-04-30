"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DocUtils = require("../doc-utils");
var Errors = require("../errors");

var moduleName = "rawxml";
var wrapper = require("../module-wrapper");

function throwRawTagShouldBeOnlyTextInParagraph(options) {
	var err = new Errors.XTTemplateError("Raw tag should be the only text in paragraph");
	var tag = options.part.value;
	err.properties = {
		id: "raw_xml_tag_should_be_only_text_in_paragraph",
		explanation: "The tag " + tag,
		xtag: options.part.value,
		paragraphParts: options.paragraphParts
	};
	throw err;
}

function getInner(_ref) {
	var part = _ref.part,
	    left = _ref.left,
	    right = _ref.right,
	    postparsed = _ref.postparsed,
	    index = _ref.index;

	var paragraphParts = postparsed.slice(left + 1, right);
	paragraphParts.forEach(function (p, i) {
		if (i === index - left - 1) {
			return;
		}
		if (p.type === "placeholder" || p.type === "content" && p.position === "insidetag") {
			throwRawTagShouldBeOnlyTextInParagraph({ paragraphParts: paragraphParts, part: part });
		}
	});
	return part;
}

var RawXmlModule = function () {
	function RawXmlModule() {
		_classCallCheck(this, RawXmlModule);

		this.name = "RawXmlModule";
	}

	_createClass(RawXmlModule, [{
		key: "optionsTransformer",
		value: function optionsTransformer(options, docxtemplater) {
			this.fileTypeConfig = docxtemplater.fileTypeConfig;
			return options;
		}
	}, {
		key: "parse",
		value: function parse(placeHolderContent) {
			var type = "placeholder";
			if (placeHolderContent[0] !== "@") {
				return null;
			}
			return { type: type, value: placeHolderContent.substr(1), module: moduleName };
		}
	}, {
		key: "postparse",
		value: function postparse(parsed) {
			return DocUtils.traits.expandToOne(parsed, { moduleName: moduleName, getInner: getInner, expandTo: this.fileTypeConfig.tagRawXml });
		}
	}, {
		key: "render",
		value: function render(part, options) {
			if (part.module !== moduleName) {
				return null;
			}
			var value = options.scopeManager.getValue(part.value);
			if (value == null) {
				value = options.nullGetter(part);
			}
			return { value: value };
		}
	}]);

	return RawXmlModule;
}();

module.exports = function () {
	return wrapper(new RawXmlModule());
};