
export class Course {

    constructor(
        public _id: string,
        public title: string,
        public description: string,
        public weeks: string,
        public tuition: number,
        public minimumSkill: string,
        public scholarshipAvailable: boolean,
        public createdAt: Date,
        public bootcamp: string
    ) { }
}