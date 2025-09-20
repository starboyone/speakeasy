import { Datagrid, List, ReferenceField, SelectField, TextField } from "react-admin"

export const ChallengeList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <ReferenceField source="lessonId" reference="lessons" />
                <SelectField source="type" choices={[
                    {
                        id: "SELECT",
                        name: "SELECT",
                    },
                    {
                        id: "ASSIST",
                        name: "ASSIST",
                    },
                    {
                        id: "HEAR",
                        name: "HEAR",
                    },
                ]} />
                <TextField source="question" />
                <TextField source="order" />
            </Datagrid>
        </List>
    )
}