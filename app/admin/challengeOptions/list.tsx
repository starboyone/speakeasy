import { Datagrid, List, ReferenceField, SelectField, TextField } from "react-admin"

export const ChallengeOptionList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <ReferenceField source="challengeId" reference="challenges" label="Упражнение" />
                <TextField source="text" label="Текст"/>
                <TextField source="correct" label="Правильность"/>
                <TextField source="imgSrc" label="Изображение"/>
                <TextField source="audioSrc" label="Аудио"/>
            </Datagrid>
        </List>
    )
}