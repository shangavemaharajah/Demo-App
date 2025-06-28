export const mockApiData = {
  pipeline: {
    new: [
      { id: "1", name: "Sarah Dunn", loan_type: "Home Loan", amount: 300000, status: "Renew" },
      { id: "3", name: "Lisa Carter", loan_type: "Home Loan", amount: 450000, status: "New" }
    ],
    in_review: [
      { id: "2", name: "Alan Matthews", loan_type: "Personal Loan", amount: 20000, status: "In Review" }
    ],
    approved: []
  },
  borrowerDetails: {
    "1": {
      id: "1", name: "Sarah Dunn", email: "sarah.dunn@example.com", phone: "(355)123-4557",
      loan_amount: 300000, status: "In Review", employment: "At Tech Company", income: 120000,
      existing_loan: 240000, credit_score: 720, source_of_funds: "Declared",
      risk_signal: "Missing Source of Funds declaration",
      ai_flags: ["Income Inconsistent with Bank statements", "High Debt-to-Income Ratio detected"]
    },
    "2": {
      id: "2", name: "Alan Matthews", email: "alan.matthews@example.com", phone: "(355)987-6543",
      loan_amount: 20000, status: "In Review", employment: "Freelance Consultant", income: 65000,
      existing_loan: 15000, credit_score: 680, source_of_funds: "Declared",
      risk_signal: "Low credit score for loan amount",
      ai_flags: ["Irregular income pattern", "Recent credit inquiries"]
    },
    "3": {
      id: "3", name: "Lisa Carter", email: "lisa.carter@example.com", phone: "(355)456-7890",
      loan_amount: 450000, status: "New", employment: "Senior Manager", income: 150000,
      existing_loan: 0, credit_score: 780, source_of_funds: "Declared",
      risk_signal: null,
      ai_flags: []
    }
  },
  broker: {
    name: "Robert Turner", deals: 16, approval_rate: "75%", pending: 7660
  },
  workflow: {
    steps: [
      "Deal Intake", "IDV & Credit Check", "Document Upload", 
      "AI Validation", "Credit Committee", "Approval & Docs", "Funder Syndication"
    ]
  }
};
