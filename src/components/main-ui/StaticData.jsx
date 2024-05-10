import React, { useState, useEffect } from "react";
import { useChat } from "../../hooks/useChat";
import { FloatButton } from "antd";
import { CaretUpOutlined, UpOutlined } from "@ant-design/icons";
import mainPic from "../../assets/chat-frame.png";

const StaticData = () => {
  const { minimize, setMinimize, modalContent } = useChat();
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    if (modalContent.includes("Kamyab Karobar Account")) {
      setAccountInfo({
        features: [
          "Account opening deposit requirement is PKR 1,000/-",
          "Monthly Average balance requirement is PKR 50,000/-",
          "Free Services upon maintaining Monthly Average Balance Requirement:",
          "Free Debit Card - Silver/ Gold (Both Issuance & Annual Fee)",
          "Free ADC SMS Alerts",
          "Free e-Statements",
          "Free Local Fund Transfers to any BAFL Account",
          "Orbit Reward Points",
          "Utmost Transactional Convenience",
        ],
        targetMarket: [
          "Business Individuals with High Transactional Needs",
          "Sole-Proprietors & Corporate Customers including Private / Public Limited Companies",
          "Charge Sensitive Business Segment",
        ],
        eligibilityCriteria: [
          "Account opening with only PKR 1,000/-.",
          "Monthly average balance requirement of only PKR 50,000/-",
        ],
      });
    } else if (modalContent.includes("Alfalah PKR Current Account")) {
      setAccountInfo({
        features: [
          "Non-Interest bearing checking account",
          "Account opening requirement: PKR 1000",
          "Minimum monthly balance requirement: PKR 10,000",
          "Free SMS Alerts on Digital Transactions",
          "Free E-Statements",
          "Free Local Fund Transfers to any BAFL Account",
          "Orbit Reward Points",
          "Unmatched Transactional Convenience",
          "Frequent access to your account without any limits or restrictions",
        ],
        targetMarket: [
          "Customers with High Transactional Needs",
          "Individual Depositors, Joint Account Holders, Sole Proprietors & Small Traders.",
          "Salaried Individuals",
        ],
        eligibilityCriteria: [
          "Account opening with only Rs. 1,000/-.",
          "Monthly average balance requirement of only PKR 10,000/-.",
        ],
      });
    } else if (modalContent.includes("Alfalah Care Account")) {
      setAccountInfo({
        features: [
          "Attractive Returns with monthly payout",
          "profit calculated on daily balance",
          "Tier based rate setup",
          "No Minimum Balance Requirement",
          "Free e-statements",
          "Free SMS Alerts on Digital Transactions",
          "Free Local Fund Transfers to any BAFL Account",
          "Orbit Reward Points",
          "Utmost Transactional Convenience",
          "No restrictions on deposits/ withdrawals",
        ],
        targetMarket: [
          "For individuals over 55 years",
          "Retirees, pensioners, housewives etc.",
        ],
        eligibilityCriteria: [
          "Account opening with only PKR 100, with no service charges",
          "No minimum monthly balance requirement",
        ],
      });
    } else if (modalContent.includes("Alfalah Royal Profit Account")) {
      setAccountInfo({
        features: [
          "Account opening with only Rs. 100",
          "No ​​minimum balance requirement",
          "Monthly Profit payout",
          "Flexible returns on higher balances (subject to approvals)",
          "Free e-statements",
          "Free SMS Alerts on Digital Transactions",
          "Free Local Fund Transfers to any BAFL Account",
        ],
        targetMarket: [
          "For high-net worth individuals and companies",
          "Rate sensitive customers",
        ],
        eligibilityCriteria: [
          "Minimum account opening requirement of PKR 100/-",
          "No monthly minimum balance requirement",
        ],
      });
    } else if (modalContent.includes("Alfalah Term Deposit")) {
      setAccountInfo({
        features: [
          "PKR Term Deposit is a fixed deposit, tier-based product.",
          "Amount can be placed for 1 month, 3 months, 6 months, 1 year, 2 years, 3 years, 4 years and 5 years.",
          "Profit is paid monthly and at maturity for tenors less than 1 year, and monthly and annually for tenors of more than 1 year.",
          "No minimum placement amount.",
          "For individuals, joint account holders, sole proprietors, private limited companies, public limited companies, partnerships.",
        ],
        targetMarket: [
          "All Segments - For individuals, joint account holders, sole proprietors, private limited, public limited companies & partnerships.",
        ],
        eligibilityCriteria: [
          "No Minimum Amount of Placement.",
          "Checking Account with BAFL.",
        ],
      });
    } else if (
      modalContent.includes("Alfalah Mahana Amdan Term Deposit Account")
    ) {
      setAccountInfo({
        features: [
          "Alfalah Mahana Amdan is a 1, 2, 3, 4 and 5 year fixed term deposit.",
          "Profit is paid monthly.",
          "Minimum placement amount of PKR 100,000.",
          "No upper limit on deposit amount.",
          "Only for individual/joint account holders and customers. Companies/corporates/businesses NOT eligible for this product.",
          "Deposit in PKR only.",
        ],
        targetMarket: [
          "Small to middle income individuals (Small/medium individual savers, Housewives/Non-working women, Retired individuals, Salaried individuals, Pensioners).",
        ],
        eligibilityCriteria: [
          "For Only for individual/joint account holders and customers. Companies/corporates/businesses NOT eligible for this product.",
        ],
      });
    } else if (
      modalContent.includes("Alfalah Islamic Foreign Currency Current Account")
    ) {
      setAccountInfo({
        features: [
          "Account can be opened in US Dollar, Pound Sterling or Euro currency.",
          "Minimum initial deposit requirement for account opening is 100/- (USD, GBP or EURO).",
          "No minimum and maximum balance limit for profit eligibility.",
          "No restriction on deposit and withdrawal transactions.",
          "Single tier account.",
          "Free first cheque book.",
          "Complimentary account statement semi-annually.",
          "Free E-statements.",
        ],
        targetMarket: [
          "The target market for Falah Foreign Currency Current Account is Sole proprietors, Medium and Large sized traders and self-employed individuals except Institutions, Corporations and Firms whose businesses are not Shari’ah compliant.",
        ],
        eligibilityCriteria: [
          "Meeting eligibility & KYC criteria as per Bank’s guidelines.",
          "Documents requirement as per normal checking account opening for Individuals / Sole proprietors /Company / Partnership / Proprietor / NGOs / Clubs / Traders etc.",
          "Institutions, Corporations and Firms whose businesses are not Shariah compliant are not eligible.",
        ],
      });
    } else if (modalContent.includes("Alfalah Islamic Asaan Current Account")) {
      setAccountInfo({
        features: [
          "No minimum balance requirement.",
          "Free Online Banking through any Alfalah Islamic Branch.",
          "Monthly cash deposit/withdrawal limit of up to Rs. 1 million.",
          "Initial deposit requirement Rs. 100/-.",
          "Other Features: Single tier account, Digital Onboarding, Free Takkaful Coverage on PKR 10,000 avg balance, Complementary Account Statement Semi Annually, Free Online Banking, Sms Updates, Visa Debit card.",
          "As per 'BPRD/AML-01/2023-2280 - Temporary Enhancement of Limits of Asaan Account for Facilitation of Intending Pilgrims of Hajj 2023', In order to facilitate intending pilgrims of Hajj 2023, limits for Asaan Accounts are temporarily enhanced from PKR 1 million to PKR 1.5 million. The enhanced limits shall be valid till June 30, 2023.",
        ],
        targetMarket: [
          "The Asaan Account is targeted at common people and is open to all low income unbanked/under-banked masses that face difficulties in account opening due to normal account opening requirements or lesser means. These segments of society may include but are not limited to skilled/unskilled workforce, farmers, less educated/uneducated people, laborers/daily wagers, women/housewives, self-employed individuals, pensioners, young adult population etc.",
          "Only individuals can open Alfalah Islamic Asaan Current Account.",
        ],
        eligibilityCriteria: [
          "All Pakistani Nationals with CNIC/NICOP/SNIC.",
          "Meeting eligibility & KYC criteria as per Bank’s guidelines.",
          "Documents requirement as per normal checking account opening for Individuals.",
        ],
      });
    } else if (modalContent.includes("Falah Business Account")) {
      setAccountInfo({
        features: [
          "Initial deposit requirement for Falah Business account is Rs. 100/-.",
          "Free first Cheque Books*.",
          "Account statements (semiannually).",
          "E-statements.",
          "Online transactions within the Bank Alfalah network.",
          "Profit calculated on daily balance.",
          "Profit payable monthly.",
        ],
        targetMarket: [
          "The target market for Falah Business Account is Businessmen, Sole proprietors, Medium and large sized traders except Institutions, Corporations and Firms whose businesses are not Shariah compliant.",
        ],
        eligibilityCriteria: [
          "Meeting eligibility & KYC criteria as per Bank’s guidelines.",
          "Documents requirement as per normal checking account opening for Individuals / Sole proprietors / Company / Partnership / Proprietor / NGOs / Clubs / Traders etc.",
          "Institutions, Corporations and Firms whose businesses are not Shari’ah compliant are not eligible.",
        ],
      });
    } else if (
      modalContent.includes("Alfalah Islamic Foreign Currency Savings Account")
    ) {
      setAccountInfo({
        features: [
          "Account can be opened in US Dollar, Pound Sterling or Euro currency.",
          "Minimum initial deposit requirement for account opening is 100/- (USD, GBP or EURO).",
          "No minimum and maximum balance limit for profit eligibility.",
          "No restriction on deposit and withdrawal transactions.",
          "Profit is calculated on average balance of the month and paid semi-annually.",
          "Single tier account.",
          "Free first cheque book.",
          "Complimentary account statement semi-annually.",
          "Free E-statements.",
        ],
        targetMarket: [
          "The target market for Falah Foreign Currency Saving Account is Sole proprietors, Medium and Large sized traders and self-employed individuals except Institutions, Corporations and Firms whose businesses are not Shari’ah compliant.",
        ],
        eligibilityCriteria: [
          "Meeting eligibility & KYC criteria as per Bank’s guidelines.",
          "Documents requirement as per normal checking account opening for Individuals / Sole proprietors / Company / Partnership / Proprietor / NGOs / Clubs / Traders etc.",
          "Institutions, Corporations and Firms whose businesses are not Shariah compliant are not eligible.",
        ],
      });
    }
  }, [modalContent]);

  const backtoChat = () => {
    setMinimize(false);
  };

  return (
    <div className="bg-[#ffffff] lg:ml-9 rounded-3xl h-[685px] px-5 relative overflow-hidden">
      <h1 className="lg:text-[20px] t-[16px] font-semibold lg:h-[69px] h-[55px] flex items-center border-b-[1px] border-b-[#F0F0F0] backdrop-blur-2xl justify-between">
        Here are your Answers
        <FloatButton
          shape="circle"
          type="danger"
          icon={<CaretUpOutlined />}
          style={{ top: 15, border: "1px solid",boxShadow:"none" }} className="hover:text-white hover:bg-bg-secondary"
          onClick={backtoChat}
        />
      </h1>
      {accountInfo && (
        <div className="ml-6">
          <div className="mb-4">
            <h1 className="font-semibold mb-2 mt-2">
              Product Features/ Benefits:
            </h1>
            <ul className="bg-sidbar-color rounded-2xl p-2">
              {accountInfo.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h1 className="font-semibold mb-2">Target Market:</h1>
            <ul className="bg-sidbar-color rounded-2xl p-2">
              {accountInfo.targetMarket.map((segment, index) => (
                <li key={index}>{segment}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h1 className="font-semibold mb-2">Eligibility Criteria:</h1>
            <ul className="bg-sidbar-color rounded-2xl p-2">
              {accountInfo.eligibilityCriteria.map((criteria, index) => (
                <li key={index}>{criteria}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaticData;
