import { Create, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from "react-admin"

export const ChallengeCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <ReferenceInput source="lessonId" reference="lessons" label="Lesson"/>
                <SelectInput source="type" choices={[
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
                ]} label="Type"/>
                <TextInput source="question" validate={[required()]} label="question"/>
                <NumberInput source="order" validate={[required()]} label="Order"/>
            </SimpleForm>
        </Create    >
    )
}