export class BriefModel {
    confirmed: number;
    deaths: number;
    recovered: number;
    constructor() {}
}

export class TimeSeries {
    date: Date;
    brief: BriefModel;
    constructor() {
        this.brief = new BriefModel();
    }
}

export class DataModel {
    globalBrief: BriefModel;
    localBrief: BriefModel;
    timeSeries: TimeSeries[];
    localData: LocalData;
    rapidBrief: RapidModel;
    constructor() {
        this.globalBrief = new BriefModel();
        this.localBrief = new BriefModel();
    }
}

export class RapidModel {
    // tslint:disable-next-line: variable-name
    total_cases: string;
      // tslint:disable-next-line: variable-name
    total_deaths: string;
      // tslint:disable-next-line: variable-name
    total_recovered: string;
      // tslint:disable-next-line: variable-name
    new_cases: string;
      // tslint:disable-next-line: variable-name
    new_deaths: string;
    // tslint:disable-next-line: variable-name
    recoveredPercentage: any;
    constructor() {}
}


export class LocalData {
    // tslint:disable-next-line: variable-name
    local_new_cases: number;
    // tslint:disable-next-line: variable-name
    local_total_cases: number;
    // tslint:disable-next-line: variable-name
    local_deaths: number;
    // tslint:disable-next-line: variable-name
    local_new_deaths: number;
    // tslint:disable-next-line: variable-name
    local_recovered: number;
    // tslint:disable-next-line: variable-name
    recoveredPercentage: any;
    // tslint:disable-next-line: variable-name
    update_date_time: any;
    constructor() {
    }
}
