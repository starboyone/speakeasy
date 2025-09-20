import { Edit, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from "react-admin"

export const ChallengeOptionEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <ReferenceInput source="challengeId" reference="challenges" label="Упражнение"/>
                <TextInput source="text" validate={[required()]} label="Текст"/>
                <TextInput source="correct" validate={[required()]} label="Правильность"/>   
                <TextInput source="imgSrc" validate={[]} label="Изображение"/>
                <TextInput source="audioSrc" validate={[]} label="Аудио"/>
            </SimpleForm>
        </Edit>
    )
}