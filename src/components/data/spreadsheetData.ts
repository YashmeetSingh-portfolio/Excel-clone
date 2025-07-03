
export interface SpreadsheetRowData {
    jobRequest: string;
    submitted: string;
    status: string;
    submitter: string;
    url: string;
    assigned: string;
    priority: string;
    dueDate: string;
    estValue: string;
}

export const customData: SpreadsheetRowData[] = [
    {
        jobRequest: "Launch social media campaign for product XYZ",
        submitted: "15-11-2024",
        status: "In-process",
        submitter: "Aisha Patel",
        url: "www.aishapatel.com",
        assigned: "Sophie Choudhury",
        priority: "Medium",
        dueDate: "20-11-2024",
        estValue: "6,200,000",
    },
    {
        jobRequest: "Update press kit for company redesign",
        submitted: "28-10-2024",
        status: "Need to start",
        submitter: "Irfan Khan",
        url: "www.irfankhanprojects.com",
        assigned: "Tejas Pandey",
        priority: "High",
        dueDate: "30-10-2024",
        estValue: "3,500,000",
    },
    {
        jobRequest: "Finalize user testing feedback for app",
        submitted: "05-12-2024",
        status: "In-process",
        submitter: "Mark Johnson",
        url: "www.markjohnsonstudio.com",
        assigned: "Rachel Lee",
        priority: "Medium",
        dueDate: "10-12-2024",
        estValue: "4,750,000",
    },
    {
        jobRequest: "Design new features for the website",
        submitted: "10-01-2025",
        status: "Complete",
        submitter: "Emily Green",
        url: "www.emilygreencreative.com",
        assigned: "Tom Wright",
        priority: "Low",
        dueDate: "15-01-2025",
        estValue: "5,900,000",
    },
    {
        jobRequest: "Prepare financial report for Q4",
        submitted: "25-01-2025",
        status: "Blocked",
        submitter: "Jessica Brown",
        url: "www.jessicabrownfinance.com",
        assigned: "Kevin Smith",
        priority: "Low",
        dueDate: "30-01-2025",
        estValue: "2,800,000",
    },
];



const emptyData: SpreadsheetRowData[] = Array.from({ length: 25 }, () => ({
    jobRequest: "",
    submitted: "",
    status: "",
    submitter: "",
    url: "",
    assigned: "",
    priority: "",
    dueDate: "",
    estValue: "",
}));

export const allSpreadsheetData: SpreadsheetRowData[] = [...customData,  ...emptyData];
