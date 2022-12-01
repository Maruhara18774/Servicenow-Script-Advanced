/* IDEA
Partner SN > Script 1 -> 
My SN  > Script 2
*/
// Change Request Generate Import Script
var var_CR_SYS_ID = '';
var var_DIRECT_MAP_FIELDS = [
    'requested_by',
    'category',
    'u_sub_category',
    'business_service',
    'cmdb_ci',
    'u_remove_ci_filter',
    'u_ci_not_available',
    'type',
    'state',
    'risk',
    'impact',
    'u_change_level',
    'u_affected_service_portfolios',
    'conflict_status',
    'conflict_last_run',
    'u_primary_source',
    'assignment_group',
    'assigned_to',
    'u_change_owner',
    'short_description',
    'description',
    // Risk and Impact
    'u_action_type',
    'u_new_feature_architectural_change',
    'u_financial_computation_transactions',
    'u_end_user_impact',
    'u_external_customer_user_impact',
    'u_rollback',
    'u_testing',
    'u_pir_effectiveness',
    'u_deployment',
    // Planning
    'u_late_change_reason_new',
    'justification',
    'implementation_plan',
    'risk_impact_analysis',
    'u_service_outage',
    'backout_plan',
    'u_external_reference',
    'test_plan',
    'u_dr_required',
    'u_no_dr_reason',
    'u_no_dr_explanation',
    // Schedule
    'start_date',
    'end_date',
    'cab_required',
    'cab_date',
    'unauthorized',
    'work_start',
    'work_end',
    'cab_delegate',
    'cab_recommendation',
    'u_manual_approvers',
    'u_manual_group_approvals'
];
var var_RELATED_MAP_TEMPLATE = {
    'task_ci': ['task','ci_item'],
    'task_cmdb_ci_service': ['task','cmdb_ci_service'],
    'u_m2m_countries_change_requests': ['u_change_request','u_country'],
    'sysapproval_approver': ['document_id','approver', 'state', 'u_approval_type', 'u_rejection_code'],
    'u_future_approval': ['u_approval_for', 'u_approver', 'u_approval_group', 'u_approval_type', 'u_order', 'u_active'],
    'change_task': ['change_request', 'u_remove_ci_filter', 'u_ci_not_available', 'u_ci_details', 'business_service', 'planned_start_date', 'planned_end_date', 'change_task_type', 'state', 'u_vendor_involved', 'assignment_group', 'assigned_to', 'order', 'u_ready_for_implementation', 'short_description', 'description', 'u_artifact_path', 'close_code', 'close_notes'],
    'u_chg_mgt_artifact_paths': ['u_change_request','u_short_description', 'u_artifact_path', 'u_type'],
    'cmdb_ci_outage': ['task_number','cmdb_ci', 'type', 'begin', 'end', 'duration', 'u_duration_scaling', 'u_fab_duration', 'u_root_cause_outage', 'u_core_function_degradation', 'short_description', 'details'],
    'u_m2m_risk_conditi_change_reque': ['u_change_request', 'u_risk_conditions', 'u_derived_value'],
    'u_m2m_impact_condition_change': ['u_change_request', 'u_derived_value', 'u_risk_conditions'],
    'task_sla': ['task','sla', 'sys_updated_on', 'stage', 'has_breached', 'schedule', 'timezone', 'start_time', 'end_time', 'planned_end_time', 'duration', 'percentage', 'time_left', 'business_duration', 'business_percentage', 'business_time_left']
};
var result = {
    'relatedList': {}
};
var grCR = new GlideRecord('change_request');
grCR.get(var_CR_SYS_ID);

for (var i = 0; i < var_DIRECT_MAP_FIELDS.length; i++) {
    var fieldName = var_DIRECT_MAP_FIELDS[i];
    result[fieldName] = grCR[fieldName] + '';
}
for (var prop in var_RELATED_MAP_TEMPLATE) {
    var rs = _generateJSON(prop, grCR, var_RELATED_MAP_TEMPLATE[prop]);
    if (rs != '') result.relatedList[prop] = rs;
}

gs.print(JSON.stringify(_beautifyJSON(result)));

function _generateJSON(table, gr, source) {
    var result = [];
    var query = new GlideRecord(table);
    query.addQuery(source[0], var_CR_SYS_ID);
    if(table == 'sysapproval_approver') query.addQuery('state', '!=', 'not_required');
    if(table == 'u_future_approval') query.addQuery('u_active', true);
    query.query();
    while(query.next()){
        var item = {};
        for(var i = 0; i < source.length;i++){
            item[source[i]] = query[source[i]] + '';
        }
        result.push(item);
    }
    if (result.length > 0) return result;
    return '';
}

function _beautifyJSON(targetJSON){
    var result = {};
    for (var prop in targetJSON) {
        if(targetJSON[prop] != ''){
            result[prop] = targetJSON[prop]
        }
    }
    return result;
}