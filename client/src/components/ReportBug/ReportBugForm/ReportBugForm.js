import React from "react";
import Button from "../../UI/Button/Button";
import "./ReportBugForm.css";

const ReportBugForm = ({reportMessage, updateInput, submitForm}) => (
    <form onSubmit={submitForm} className="ReportBugForm">
        <textarea onChange={updateInput} maxLength="264" required value={reportMessage}></textarea>
        <Button type="submit" design="submit" disabled={!reportMessage.trim().length}>
            Submit
        </Button>
    </form>
);

export default ReportBugForm;