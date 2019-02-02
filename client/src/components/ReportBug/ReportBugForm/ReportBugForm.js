import React from "react";

const ReportBugForm = ({reportMessage, updateInput, submitForm}) => (
    <form onSubmit={submitForm}>
        <textArea onChange={updateInput}>
            {reportMessage}
        </textArea>
        <Button type="submit" design="submit" />
    </form>
);

export default ReportBugForm;