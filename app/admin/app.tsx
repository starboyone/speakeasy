"use client";

import { Admin, Resource } from "react-admin"
import simpleRestDataProvider from "ra-data-simple-rest";
import { CourseList } from "./courses/list";
import { CourseCreate } from "./courses/create";
import { CourseEdit } from "./courses/edit";
import { LessonList } from "./lessons/list";
import { LessonCreate } from "./lessons/create";
import { LessonEdit } from "./lessons/edit";
import { UnitList } from "./units/list";
import { UnitCreate } from "./units/create";
import { UnitEdit } from "./units/edit";
import { ChallengeOptionList } from "./challengeOptions/list";
import { ChallengeOptionCreate } from "./challengeOptions/create";
import { ChallengeOptionEdit } from "./challengeOptions/edit";
import { ChallengeList } from "./challenges/list";
import { ChallengeCreate } from "./challenges/create";
import { ChallengeEdit } from "./challenges/edit";

const dataProvider = simpleRestDataProvider("/api");

const App = () => {

    return(
        <Admin dataProvider={dataProvider}>
            <Resource 
                name="courses"
                recordRepresentation="title"
                list={CourseList}
                create={CourseCreate}
                edit={CourseEdit}
                 />
             <Resource 
                name="units"
                recordRepresentation="title"
                list={UnitList}
                create={UnitCreate}
                edit={UnitEdit}
                 />    
            <Resource 
                name="lessons"
                recordRepresentation="title"
                list={LessonList}
                create={LessonCreate}
                edit={LessonEdit}
                 />
            <Resource 
                name="challenges"
                recordRepresentation="title"
                list={ChallengeList}
                create={ChallengeCreate}
                edit={ChallengeEdit}
                 />
            <Resource 
                name="challenge_options"
                recordRepresentation="title"
                list={ChallengeOptionList}
                create={ChallengeOptionCreate}
                edit={ChallengeOptionEdit}
                 />
        </Admin>
    )
}

export default App;