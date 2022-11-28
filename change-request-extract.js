/* IDEA
Partner SN > Script 1 -> 
My SN  > Script 2
*/
// Change Request Generate Import Script
var var_CR_SYS_ID = '';
var var_DIRECT_MAP_FIELDS = [
    'category', 
    'u_sub_category',
    'business_service',
    'u_remove_ci_filter',
    'u_ci_not_available',
    ''
];
var result = {};
var grCR = new GlideRecord('change_request');
grCR.get(var_CR_SYS_ID);

for (var i = 0; i < var_DIRECT_MAP_FIELDS.length; i++) {
    var fieldName = var_DIRECT_MAP_FIELDS[i];
    result[fieldName] = grCR[fieldName] + '';
}

gs.print(JSON.stringify(result));