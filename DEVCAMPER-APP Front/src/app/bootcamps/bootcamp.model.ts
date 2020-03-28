

export class Bootcamp {
  map(arg0: (data: any) => { _id: any; name: any; slug: any; description: any; website: any; phone: any; email: any; address: any; careers: any; averageRating: any; averageCost: any; photo: any; housing: any; jobAssistance: any; jobGuarantee: any; acceptGi: any; createdAt: any; user: any; }): any {
    throw new Error("Method not implemented.");
  }

    constructor(
        public _id: string,
        public name: string,
        public slug: string,
        public description: string,
        public website: string,
        public phone: string,
        public email: string,
        public address: string,
        public careers: string[],
        public averageRating: number,
        public averageCost: number,
        public photo: string,
        public housing: boolean,
        public jobAssistance: boolean,
        public jobGuarantee: boolean,
        public acceptGi: boolean,
        public createdAt: Date,
        public user: string
    ) {


    }

}