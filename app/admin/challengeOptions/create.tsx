import { Create, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from "react-admin"

export const ChallengeOptionCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <ReferenceInput source="challengeId" reference="challenges" label="Challenge"/>
                <TextInput source="text" validate={[required()]} label="text"/>
                <TextInput source="correct" validate={[required()]} label="Correct"/>
                <TextInput source="img_src" validate={[]} label="Image"/>
                <TextInput source="audio_src" validate={[]} label="Audio"/>
            </SimpleForm>
        </Create    >
    )
}