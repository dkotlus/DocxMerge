var config = {};

config.account = {};
config.template_table = {};
config.merged_doc_table = {};
config.source_tables = {};

/*************************************************************************************************************
 * 
 * Configuration goes below here:
 * 
 ************************************************************************************************************/

/************************* Account Config *********************************/
//The API key that gives you access to the API
//This is found at https://go.trackvia.com/#/my-info
config.account.api_key = '8675309';

//The name of the user to login as
config.account.username = 'user@user.com';

//The password of the user to login as
config.account.password = 'correcthorsebatterystaple';

//The address of the server you'll be using
config.account.environment = 'https://go.trackvia.com';

/************************* Template Table *********************************/
//The view ID we'll use to find the template files
config.template_table.view_id = 1;

//The name of the field in the template view that holds the docx file
config.template_table.field_name_for_template_document = "Template";

/************************* Merged Doc Table *********************************/
//The view ID we'll use to place the merged doc files
config.merged_doc_table.view_id = 2;

//The name of the field in the merged doc view that holds the docx file
config.merged_doc_table.merged_document_field_name = "Doc";

//The name of the field where we'll put the details of the doc merge
// (Optional)
config.merged_doc_table.merged_doc_details_field_name = "Details";

//The name of the field in the merged doc table that links to the template
// (Optional)
config.merged_doc_table.merged_doc_to_template_relationship_field_name = "Template";

//A user field in the merged doc table that is the last user to change the source records.
//This way you know who made the change
// (Optional)
config.merged_doc_table.merge_user_field_name = "Merge By User";


/************************* Source Record Tables *********************************/
//The name of the field on ANY RECORD THAT NEEDS TO BE MERGED
//that tells us which template to use
//this needs to be the same across all tables that will
//have their records merged
config.source_tables.template_relationship_field_name = "Merge Template";
//This config does not need to be edited. It'll modify the field name above to point 
//to the numeric ID of the relationship
config.source_tables.template_relationship_field_name_id = config.source_tables.template_relationship_field_name + "(id)";

//This one is a big complex but necesary
//For reaons I won't go into here we need to know
//what view to look into for records that need to be merged
//when an event fires on a given table. So we need a map
//that connects table IDs to view IDs
config.source_tables.table_ids_to_view_ids = {
                                "3" : 4
                            };

/*************************************************************************************************************
 * 
 * End config. You're all done configuring
 * 
 ************************************************************************************************************/
module.exports = config;