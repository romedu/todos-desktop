import React from "react";
import Button from "../../UI/Button/Button";

const ReportBugForm = ({reportMessage, updateInput, submitForm}) => (
    <form onSubmit={submitForm}>
        <textArea onChange={updateInput}>
            {reportMessage}
        </textArea>
        <Button type="submit" design="submit">
            Submit
        </Button>
    </form>
);

export default ReportBugForm;