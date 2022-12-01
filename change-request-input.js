var dataJSON = {};
var grCR = new GlideRecord('change_request');
grCR.initialize();
for (var prop in dataJSON) {
    if (prop != 'relatedList') {
        switch (prop) {
            case 'start_date':
                var gdate = new GlideDateTime();
                gdate.addSeconds(600);
                grCR[prop] = gdate + '';
                break;
            case 'end_date':
                var gdate = new GlideDateTime();
                gdate.addSeconds(800);
                grCR[prop] = gdate + '';
                break;
            case 'work_start':
                var gdate = new GlideDateTime();
                gdate.addSeconds(600);
                grCR[prop] = gdate + '';
                break;
            case 'work_end':
                var gdate = new GlideDateTime();
                gdate.addSeconds(800);
                grCR[prop] = gdate + '';
                break;
            default:
                grCR[prop] = dataJSON[prop];
                break;
        }
    }
}
var sysID = grCR.insert();
gs.print(sysID);