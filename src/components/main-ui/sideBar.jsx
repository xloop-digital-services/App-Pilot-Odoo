import React, { useState, useRef } from "react";
import QuestionMark from "../../assets/message-question.svg";
import QuestionModal from "./QuestionModal";
import { useChat } from "../../hooks/useChat";
import { useMuteContext } from "../Avatar2";
import { Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
// import { useChatModal } from "../../hooks/useChatModal";

const backendUrl = "http://13.233.132.194:8000";

let stepDescriptions = null;
let images = null;

function SideBar({questions}) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false); // New state
  const [modalContent, setModalContent] = useState("");
  const[features, setFeatures] = useState(""); // State to store modal content
  const [specialQuestions] = useState([
    "What is ALFALAH KAMYAB KAROBAR ACCOUNT?",
    "Who can benefit from Alfalah Kamyab Karobar Account?",
    "Can a personal account be used for business transactions?",
    "What is the minimum & maximum balance requirement to open this ALFALAH PKR CURRENT ACCOUNT?",
    "Who can open this ALFALAH CARE ACCOUNT?",
    "Who can approve rates above the minimum rate of return on Royal Profit deposits for deposits above PKR 5 Million?",
    "Who can place deposits in this ALFALAH TERM DEPOSIT?",
    "What is ALFALAH TERM DEPOSIT?",
    "How often will the profit be credited in ALFALAH MAHANA AMDAN TERM DEPOSIT ACCOUNT?",
    "What is ALFALAH ISLAMIC FOREIGN CURRENCY CURRENT ACCOUNT?",
    "What is SAVING ACCOUNT FALAH BUSINESS ACCOUNT?",
    "What is ALFALAH ASAAN REMITTANCE SAVINGS ACCOUNT?",
    "What is the eligibility criteria for ALFALAH ASAAN SAVINGS ACCOUNT?",
    "What are the different terms in ALFALAH ISLAMIC FOREIGN CURRENCY TERM DEPOSIT?",
    "What is the nature of product for ALFALAH ISLAMIC PREMIUM TERM DEPOSIT- MONTHLY?",
    "What is the minimum investment required for ALFALAH ISLAMIC FOREIGN CURRENCY TERM DEPOSIT?",
    "What are different variants of CREDIT CARD?",
    "What are the documentation required for Alfalah Platinum credit cards?",
    "What is the minimum limit for all credit cards?",
    "How much loan facility can I avail for Alfalah Auto Loan?",
    "What is the period of the Alfalah Auto Loan?",
    "How is Alfalah Auto Loan different from other financing schemes available in Pakistan?",
    "What are different variants of DEBIT CARD?",
    "What are the documentation required for Alfalah Platinum DEBIT CARD?",
    "What is the minimum limit for all DEBIT CARD?"
  ]);

  // const [activeStep, setActiveStep] = useState(0);

  const [micStart, setMicStart] = useState(false);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [startStopRecording, setStartStopRecording] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const input = useRef();
  const {
    // chat,
    currentIndex,
    selectLanguage,
    // setSelectLanguage,
    setCurrentIndex,
    // loading,
    // setLoading,
    // micOn,
    // setMicOn,
    // cameraZoomed,
    // setCameraZoomed,
    // message,
    // messages,
  } = useChat();


  const handleQuestionClick = async (question) => {
    setModalLoading(true);

    if (specialQuestions.includes(question)) {
      setShowModal(true);
      setModalLoading(false);
      setModalContent(question);
      return;
    }
    else{

    const response = await fetch(
      `${backendUrl}/query_response/${encodeURIComponent(
        question
      )}/${selectLanguage}`
    );
    const result = await response.json();
    console.log("Question response data", result);

    stepDescriptions = result.data.map((step) => step.step);
    images = result.data.map((step) => step.image);

    setSelectedQuestion(question);
    // console.log(JSON.stringify(stepDescriptions));
    setModalLoading(false);}
  };

  const closeModal = () => {
    setSelectedQuestion(null);  
    setShowModal(false);
    setFeatures("");
  };


  const handleNextClick = (length) => {
    console.log(length);
    if (currentIndex < length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="bg-[#fff] pb-[30px] px-[20px] rounded-3xl overflow-y-scroll" style={{height:"420px"}}>
      <h1 className="text-center p-2.5 text-[20px] font-semQuestionModalibold h-[69px] flex items-center justify-center backdrop-blur-sm border-b-[1px] border-b-[#F0F0F0] mb-2">
        {" "}
        Frequently Asked journeys{" "}
      </h1>

      {modalLoading ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
        </div>
      ) : (
        selectedQuestion && (
          <QuestionModal
            selectedQuestion={selectedQuestion}
            closeModal={closeModal}
            stepDescriptions={stepDescriptions}
            images={images}
            // modalLoading={modalLoading}
            // loading={loading}
            // chat={chat}
            // activeStep={activeStep}
            // inputRef={input}
            // sendMessage={sendMessage}
            // micStart={micStart}
            // micOn={micOn}
            // loading={loading}
            // setMicOn={setMicOn}
            // setMicStart={setMicStart}
            // startStopHandle={startStopHandle}
            // startStopRecording={startStopRecording}
            // messages={messages}
            handleNextClick={handleNextClick}
            currentIndex={currentIndex}
          />
        )
      )}


<Modal width="40%"
        visible={showModal}
        onCancel={closeModal}
        footer={null}
      >
        {modalContent === "What is ALFALAH KAMYAB KAROBAR ACCOUNT?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px" }} onClick={()=> setFeatures("Attractive Returns with monthly payout. Profit calculated on daily balance. Tier based rate setup. No Minimum Balance Requirement. Free e-statements. Free SMS Alerts on Digital Transactions. Free Local Fund Transfers to any BAFL Account")}> Product Features </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white",fontSize:"20px"  }} onClick={()=> setFeatures("Business Individuals with High Transactional Needs. Sole-Proprietors & Corporate Customers including Private / Public Limited Companies. Charge Sensitive Business Segment")}> Target Market </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white",fontSize:"20px"  }} onClick={()=> setFeatures("Account opening with only PKR 1,000/-.Monthly average balance requirement of only PKR 50,000/-")}> Eligibility Criteria </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px"  }} onClick={()=> setFeatures("All other charges will be charged as per the bank’s schedule of charges which can be accessed through following link: https://baflearn.bankalfalah.com/doc/SOBC Conventional Jan - June 2024.pdf#page=48")}> Associated Charges </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white",fontSize:"20px"  }}onClick={()=> setFeatures(`Q1: Do all BAFL branches country-wide offer this product? A: Yes, all BAFL conventional branches offer this product. Q2: What are the monthly average balance maintenance requirement? A: You need to maintain a monthly average balance of Rs. 50,000/-. Q3: Who can benefit from Alfalah Kamyab Karobar Account? A: The Alfalah Kamyab Karobar Account (AKK) is designed for Businessmen/Sole-Proprietors, Partnerships, Limited companies, Clubs/Societies/Associations/Professional firms, Non-profit organizations, SME/Traders. Landlords can also open accounts but are categorized as high-risk. Q4: Can a personal account be used for business transactions? A: No, personal accounts cannot be used for business transactions, except for certain cases like proprietorships. Q5: What happens if the monthly average balance in the account falls below PKR 50,000? A: If the monthly average balance falls below PKR 50,000, a service charge of PKR 50 inclusive of Federal Excise Duty (FED) will be levied on the account monthly. Q6: What are the benefits of maintaining a monthly average balance? A: Maintaining a monthly average balance of Rs. 50,000/- offers benefits like a Free Debit Card, Free ADC SMS Alerts, and other transactional waivers. Q7: Are there any other free services available? A: Charges may apply as per the prevailing Schedule of Charges (SOC).`)}> FAQs</button>
          </div>
          {features && (
  <div style={{ fontSize: "14px" }}>
    {features.split(/[.?]/).map((part, index) => (
      <div key={index}>
       {part.trim()} 
      </div>
    ))}
  </div>
)}
          </div>
        }
        {modalContent === "Who can benefit from Alfalah Kamyab Karobar Account?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <p> Alfalah Kamyab Karobar Account (AKK) is especially tailor made for the following customers: Businessmen/Sole-Proprietors
Partnerships
Limited companies
Clubs / Societies / Associations / Professional firms
Non-profit organizations
SME / Traders
Landlords can also open the account but will be categorized as high-risk as per the SBP and Bank Alfalah’s own AML/Client on-boarding processes.</p>
</div>
          </div>
        }
        {modalContent === "Can a personal account be used for business transactions?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <p>No, the SBP strictly prohibits personal accounts to be used for business transactions. Branches shall not allow personal accounts to be used for business purposes except proprietorships, small businesses and professions where constituent documents are not available and the branches are satisfied with KYC profile of the account holder, purpose of relationship and expected turnover of the account keeping in view financial status & nature of business of that customer.</p>
</div>
          </div>
        }
        {modalContent === "What is the minimum & maximum balance requirement to open this ALFALAH PKR CURRENT ACCOUNT?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <p>A: Minimum balance requirement for opening this account is Rs. 1,000/- and there is no maximum limit.</p>
</div>
          </div>
        }
        {modalContent === "Who can open this ALFALAH CARE ACCOUNT?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px" }} onClick={()=> setFeatures("Attractive Returns with monthly payout. Profit calculated on daily balance. Tier based rate setup. No Minimum Balance Requirement. Free e-statements. Free SMS Alerts on Digital Transactions. Free Local Fund Transfers to any BAFL Account. Orbit Reward Points. Utmost Transactional Convenience. No restrictions on deposits/ withdrawals.")}> Product Features </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white",fontSize:"20px"  }} onClick={()=> setFeatures("For individuals over 55 years Retirees, pensioners, housewives etc.")}> Target Market </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white",fontSize:"20px"  }} onClick={()=> setFeatures("Account opening with only PKR 100, with no service charges. No minimum monthly balance requirement")}> Eligibility Criteria </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px"  }} onClick={()=> setFeatures("All other charges will be charged as per the bank’s schedule of charges. Please find below link for your reference. https://baflearn.bankalfalah.com/doc/SOBC Conventional Jan - June 2024.pdf#page=44")}> Associated Charges </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white",fontSize:"20px"  }}onClick={()=> setFeatures("Q1: Does all BAFL branches country-wide offer this product? A: Yes - all BAFL conventional branches offers this product. Q2: Who can open this account? A: Any Pakistani resident individual aged 55 or above can open this account. NRP’s can open this account based on providing the relevant documentation. This account is for individual/joint customers only. In case of joint account, primary account holder must be aged 55 or above. Other customers like companies, corporate, etc. are not eligible for opening of this account. Q3: What is the minimum & maximum balance requirement to open this account? A: Initial deposit requirement to open this account is Rs. 100/- and there is no minimum and maximum balance requirement. Q4: Will customer be issued cheque book and VISA Debit/ATM card? A: Yes, the customer will get free cheque book. VISA Debit/ATM card can be issued, however, charges may be applicable as per the prevailing Schedule of Charges (SOC). Q5: Is BAFL online banking transaction facility available for this account? A: Yes, customers may avail online banking transaction facility using this account. Q6: Are there any service charges for this account? A: All charges are applicable as per the prevailing Schedule of Charges (SOC). Q7: How many Care accounts can be opened by one customer? A: Only one account per customer will be allowed across all branches of Bank Alfalah in Pakistan.")}> FAQs</button>
          </div>
          {features && (
  <div style={{ fontSize: "14px" }}>
    {features.split(/[.?]/).map((part, index) => (
      <div key={index}>
       {part.trim()} 
      </div>
    ))}
  </div>
)}
          </div>
        }
        {modalContent === "Who can approve rates above the minimum rate of return on Royal Profit deposits for deposits above PKR 5 Million?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <p>Rates above the prevailing rack rates need to be approved by the relevant authorities as per the delegation matrix. Branches can only quote the rack rate to customers. All special rates will require prior approval before it can be quoted to customers.</p>
</div>
          </div>
        }

{modalContent === "What is ALFALAH TERM DEPOSIT?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px" }} onClick={()=> setFeatures("PKR Term Deposit is a fixed deposit, tier-based product. Amount can be placed for 1 month, 3 months, 6 months, 1 year, 2 years, 3 years, 4 years and 5 years. Profit is paid monthly and at maturity for tenors less than 1 year, and monthly and annually for tenors of more than 1 year. No minimum placement amount. For individuals, joint account holders, sole proprietors, private limited companies, public limited companies, partnerships.")}> Product Features </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white",fontSize:"20px"  }} onClick={()=> setFeatures("All Segments - For individuals, joint account holders, sole proprietors, private limited, public limited companies & partnerships.")}> Target Market </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white",fontSize:"20px"  }} onClick={()=> setFeatures("No Minimum Amount of Placement. Checking Account with BAFL")}> Eligibility Criteria </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px"  }} onClick={()=> setFeatures("All other charges will be charged as per the bank’s schedule of charges. Please find below link for your reference. https://baflearn.bankalfalah.com/doc/SOBC Conventional Jan - June 2024.pdf#page=47")}> Associated Charges </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white",fontSize:"20px"  }}onClick={()=> setFeatures("Q1: Do all BAL branches country-wide offer this product? A: Yes – all BAFL conventional branches offer this Product. Q2: Who can place deposits in this account? A: Any Resident Pakistani can open this account. Non-Resident Pakistanis (NRP’s) can open this account based on providing the relevant documentation. This account is for individuals/joint account holders, sole proprietors, private limited companies, public limited companies, partnerships etc. Q3: Can the customer withdraw the deposit before the end of the fixed deposit period? A: Yes. However, a premature encashment penalty will be levied as per the bank’s schedule of charges. Q4: How often will the profit be credited? A: The profit amount will be credited into link account as per the need of the customer, example: monthly, quarterly, semi-annually, annually or at maturity. Q5: Can the customer avail special pricing on the deposit? A: Yes, the deposit amount should be above PKR 3,000,000 and approval as per delegation matrix. Q6: Is automatic rollover facility available for this term deposit? A: Yes, automatic rollover facility is available for this term deposit.")}> FAQs</button>
          </div>
          {features && (
  <div style={{ fontSize: "14px" }}>
    {features.split(/[.?]/).map((part, index) => (
      <div key={index}>
       {part.trim()} 
      </div>
    ))}
  </div>
)}
          </div>
        }
    {modalContent === "Who can place deposits in this ALFALAH TERM DEPOSIT?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <p>Any Resident Pakistani can open this account. Non-Resident Pakistanis (NRP’s) can open this account based on providing the relevant documentation.

This account is for individuals/joint account holders, sole proprietors, private limited companies, public limited companies, partnerships etc.</p>
</div>
          </div>
        }

{modalContent === "How often will the profit be credited in ALFALAH MAHANA AMDAN TERM DEPOSIT ACCOUNT?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <p>The profit will be credited on Monthly Basis.</p>
</div>
          </div>
        }

{modalContent === "What is ALFALAH ISLAMIC FOREIGN CURRENCY CURRENT ACCOUNT?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px" }} onClick={()=> setFeatures("Account can be opened in US Dollar, Pound Sterling, or Euro currency. Minimum initial deposit requirement for account opening is 100/- (USD, GBP, or EURO). No minimum and maximum balance limit for profit eligibility. No restriction on deposit and withdrawal transactions. Single tier account. Free first cheque book. Complimentary account statement semi-annually. Free E-statements.")}> Product Features </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white",fontSize:"20px"  }} onClick={()=> setFeatures("The target market for Falah Foreign Currency Current Account is Sole proprietors, Medium and Large sized traders and self-employed individuals except Institutions, Corporations and Firms whose businesses are not Shari’ah compliant.")}> Target Market </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white",fontSize:"20px"  }} onClick={()=> setFeatures("Meeting eligibility & KYC criteria as per Bank’s guidelines. Documents requirement as per normal checking account opening for Individuals / Sole proprietors /Company / Partnership / Proprietor / NGOs / Clubs / Traders etc. Institutions, Corporations and Firms whose businesses are not Shariah compliant are not eligible.")}> Eligibility Criteria </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px"  }} onClick={()=> setFeatures("All charges will be charged as per the bank’s schedule of charges. Please find below link for your reference. https://baflearn.bankalfalah.com/doc/SOBC Islamic Jan - June 2024.pdf")}> Associated Charges </button>
                    </div>
          {features && (
  <div style={{ fontSize: "14px" }}>
    {features.split(/[.?]/).map((part, index) => (
      <div key={index}>
       {part.trim()} 
      </div>
    ))}
  </div>
)}
          </div>
        }

{modalContent === "What is SAVING ACCOUNT FALAH BUSINESS ACCOUNT?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px" }} onClick={()=> setFeatures("Initial deposit requirement for Falah Business account is Rs 100/-. Free first Cheque Books*. Account statements (semiannually). E-statements. Online transactions within the Bank Alfalah network. Profit calculated on daily balance. Profit payable monthly.")}> Product Features </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white",fontSize:"20px"  }} onClick={()=> setFeatures("The target market for Falah Business Account is Businessmen, Sole proprietors, Medium and large sized traders except Institutions, Corporations and Firms whose businesses are not Shariah compliant.")}> Target Market </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white",fontSize:"20px"  }} onClick={()=> setFeatures("Meeting eligibility & KYC criteria as per Bank’s guidelines. Documents requirement as per normal checking account opening for Individuals / Sole proprietors /Company / Partnership / Proprietor / NGOs / Clubs / Traders etc. Institutions, Corporations and Firms whose businesses are not Shariah compliant are not eligible.")}> Eligibility Criteria </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px"  }} onClick={()=> setFeatures("All charges will be charged as per the bank’s schedule of charges. Please find below link for your reference. https://baflearn.bankalfalah.com/doc/SOBC Islamic Jan - June 2024.pdf#page=41")}> Associated Charges </button>
                    </div>
          {features && (
  <div style={{ fontSize: "14px" }}>
    {features.split(/[.?]/).map((part, index) => (
      <div key={index}>
       {part.trim()} 
      </div>
    ))}
  </div>
)}
          </div>
        }

{modalContent === "What is ALFALAH ASAAN REMITTANCE SAVINGS ACCOUNT?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px" }} onClick={()=> setFeatures("No monthly minimum balance requirement. Profit calculated on Monthly Average balance. Monthly Profit Payout. First free cheque book (25 leaves). Maximum balance/credit limit of Rs. 3 million. The account can only be funded through Home Remittances. Local credits are allowed of up to PKR 1,000,000 per month. Cash withdrawal and fund transfer Limit of up to PKR 500,000 per day.")}> Product Features </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white",fontSize:"20px"  }} onClick={()=> setFeatures("Beneficiaries of Home Remittance")}> Target Market </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white",fontSize:"20px"  }} onClick={()=> setFeatures("Only Pakistan Residents (individuals) holding valid Pakistani CNIC aged between 18 and above. Non-Resident Pakistanis and other entities such as businesses, partnerships, corporates, etc. are not eligible to open this account.")}> Eligibility Criteria </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px"  }} onClick={()=> setFeatures("All charges will be charged as per the bank’s schedule of charges. Please find below link for your reference. https://baflearn.bankalfalah.com/doc/SOBC Islamic Jan - June 2024.pdf#page=41")}> Associated Charges </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white",fontSize:"20px"  }}onClick={()=> setFeatures("Q1: Do all BAL branches country-wide offer this product? A1: Yes – all BAFL IBG branches offer this product. Q2: Who can open this account? A2: This account is for resident Pakistani individuals/joint account holders only. Minors, companies, partnerships, NRP individuals, etc are not eligible for this account. Q3: What is the minimum & maximum balance requirement to open this account? A3: There is no minimum balance requirement, however the maximum balance allowed in this account is of PKR 2 million. Q4: What happens if the balance in the account goes above PKR 2 million? A4: If the balance in the account goes above PKR 2 million, then further remittances will not be allowed to credit into the account, until the account balance falls below PKR 2 million. Q5: My account balance is below PKR 2 million. How come remittance is still not credited into my account? A5: If the balance in the account is below PKR 2 million, this means that the new remittance to be credited will increase the amount to above PKR 2 million, which is not allowed. Hence it is recommended to first reduce the account balance to allow credit of new remittance. Q6: If my account balance is PKR 2 million, will I receive my profit payment? A6: Yes, only profit can be credited into this account if balance is PKR 2 million. Q7: Why can’t I deposit cash/cheques/banker’s cheque into this account? A7: This account only allows credit from home remittance. This means that cash, cheque deposits and bankers cheque (pay orders and demand drafts) deposits are not allowed into this account. Q8: If cash deposit is not allowed in this account, how can I activate my account? A8: Since deposits are not allowed in this account, it will become active after the receipt of first home remittance.")}> FAQs</button>

                    </div>
          {features && (
  <div style={{ fontSize: "14px" }}>
    {features.split(/[.?]/).map((part, index) => (
      <div key={index}>
       {part.trim()} 
      </div>
    ))}
  </div>
)}
          </div>
        }

{modalContent === "What is the eligibility criteria for ALFALAH ASAAN SAVINGS ACCOUNT?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <p>Meeting eligibility & KYC criteria as per Bank’s guidelines
Documents requirement as per normal checking account opening for Individuals.</p>
</div>
          </div>
        }

{modalContent === "What are the different terms in ALFALAH ISLAMIC FOREIGN CURRENCY TERM DEPOSIT?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <p>1-Month <br/>3-Months <br/>6-Months<br/> 1-Year</p>
</div>
          </div>
        }

{modalContent === "What is the nature of product for ALFALAH ISLAMIC PREMIUM TERM DEPOSIT- MONTHLY?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <p>A profit bearing term deposit based on the principles of Mudarabah, where Customer is “Rab-ul-Maal” and Bank is “Mudarib”. Bank may, at its discretion, use or employ such funds as it deems fit under the products and avenues approved by the Shariah Board of the Bank. Bank shall share the profit on the basis of predetermined profit sharing ratio. Return on deposits will be based on predetermined weightages for each month or any interval decided by the bank and announced as per SBP’s instructions. A sheet containing Profit Sharing Ratio and Weightages information shall be available on Customer’s demand and also be placed at the public notice board of branches and on the website of the bank.   

In the event of loss to the pool, all the investors of the pool shall share such loss proportionate to their investment. The Bank may at its option also participate in Mudarabah Pool as “Rab-ul-Maal” by comingling its own equity/funds and the funds of other depositors including the current deposits as and when required.    </p>
</div>
          </div>
        }

{modalContent === "What is the minimum investment required for ALFALAH ISLAMIC FOREIGN CURRENCY TERM DEPOSIT?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <p>$1000/-  <br/>
€ 1000/-          <br/>      
£ 1000/- </p>
</div>
          </div>
        }

{modalContent === "What are different variants of CREDIT CARD?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px" }} onClick={()=> setFeatures("Classic. Ultra Cashback. Gold. Platinum. Premier Platinum.")}> Visa </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white",fontSize:"20px"  }} onClick={()=> setFeatures("Optimus")}> Mastercard</button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white",fontSize:"20px"  }} onClick={()=> setFeatures("Gold")}> Amex </button>
                    </div>
          {features && (
  <div style={{ fontSize: "14px" }}>
    {features.split(/[.?]/).map((part, index) => (
      <div key={index}>
       {part.trim()} 
      </div>
    ))}
  </div>
)}
          </div>
        }

{modalContent === "What are the documentation required for Alfalah Platinum credit cards?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px" }} onClick={()=> setFeatures("Documentation required includes a copy of the Computerized National Identity Card (CNIC), current salary slip/salary letter with breakup, and, in case of companies not on the panel, a bank account statement reflecting 3 months’ salary credit.")}> For Salaried Applicants </button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white",fontSize:"20px"  }} onClick={()=> setFeatures("Documentation required includes a CNIC copy, computerized personal bank statement (on original bank letterhead) for the last six months, and additional documents such as tax returns, NTN, bank certificate, or proof of business for self-employed businessmen. Self-employed professionals need to provide a copy of their professional degree and relevant supporting documents.")}> For Self-Employed Applicants</button>
          <button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white",fontSize:"20px"  }} onClick={()=> setFeatures("Required documentation includes a copy of the CNIC, with additional documents as needed on a case-to-case basis.")}> For Supplementary Card Applicants </button>
                    </div>
          {features && (
  <div style={{ fontSize: "14px" }}>
    {features.split(/[.?]/).map((part, index) => (
      <div key={index}>
       {part.trim()} 
      </div>
    ))}
  </div>
)}
          </div>
        }

{modalContent === "What is the minimum limit for all credit cards?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
<button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px" }} onClick={()=> setFeatures("300,000")}> Premier Platinum </button>
<button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px" }} onClick={()=> setFeatures("300,000")}> Platinum </button>
<button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px" }} onClick={()=> setFeatures("150,000")}> Amex</button>
<button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px" }} onClick={()=> setFeatures("125,000")}> Mastercard Optimus</button>
<button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px" }} onClick={()=> setFeatures("75,000")}> Gold </button>
<button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px" }} onClick={()=> setFeatures("25,000")}> Ultra </button>
<button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px" }} onClick={()=> setFeatures("25,000")}> Classic </button>
                    </div>
          {features && (
  <div style={{ fontSize: "14px" }}>
    {features.split(/[.?]/).map((part, index) => (
      <div key={index}>
       {part.trim()} 
      </div>
    ))}
  </div>
)}
          </div>
        }

{modalContent === "How much loan facility can I avail for Alfalah Auto Loan?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <p>Minimum Rs. *200,000/- and maximum Rs. 3,000,000/-
Financing of Rs 0.300 million and less will not be allowed for less than 36 months tenor.</p>
</div>
          </div>
        }

{modalContent === "What is the period of the Alfalah Auto Loan?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <p>- 2-5 years (Vehicles up to 1000 CC) <br/>
- 2-3 Years (Vehicles above 1000 CC) <br/>
- 2-7 Years (Roshan Apni Car for Roshan Digital Account Holder Non Resident Pakistanis)</p>
</div>
          </div>
        }

{modalContent === "How is Alfalah Auto Loan different from other financing schemes available in Pakistan?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <p>Most affordable markup rates <br/>
You can choose a Locally Assembled / Manufactured car that is new / used <br/>
Apply with minimum documentation and hassle free quick processing <br/>
Select your monthly installment plan from multiple tenure options<br/>
Pay as much as you like with down payment flexibility<br/>
Enjoy special comprehensive insurance rates for complete peace of mind<br/>
No termination charges on car replacement<br/>
Option to make balloon payment<br/>
Co-Borrower Option Spouse, Parents, Siblings (Real Brother & Sister) and Children</p>
</div>
          </div>
        }

{modalContent === "What are different variants of DEBIT CARD?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
          <p>Alfalah PayPak Classic<br/>
Alfalah Visa Classic<br/>
Alfalah Visa Gold<br/>
Pehchaan Debit Card<br/>
Alfalah Visa Platinum<br/>
Alfalah Visa Signature<br/>
Alfalah Premier Visa Signature</p>
</div>
          </div>
        }
        {modalContent === "What is the minimum limit for all DEBIT CARD?" && <div style={{display:"flex", flexDirection:"column", gap:"40px"}}><div style={{display:"flex", gap:"5px", flexWrap:"wrap"}}>
<button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px" }} onClick={()=> setFeatures("Alfalah PayPak: Rs 100,000. Alfalah Visa Classic: Rs 100,000. Alfalah Visa Gold: Rs 150,000. Pehchaan Debit Card: Rs 150,000. Alfalah Visa Platinum: Rs 300,000. Alfalah Visa Signature: Rs 500,000. Alfalah Premier Visa Signature: Rs 500,000. ")}> ATM Cash Withdrawal </button>
<button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px" }} onClick={()=> setFeatures("Alfalah PayPak: Rs 50,000. Alfalah Visa Classic: Rs 50,000. Alfalah Visa Gold: Rs 100,000. Pehchaan Debit Card: Rs 100,000. Alfalah Visa Platinum: Rs 500,000. Alfalah Visa Signature: Rs 600,000. Alfalah Premier Visa Signature: Rs 600,000. ")}> POS Transactions </button>
<button style={{border:"1px solid white", borderRadius:"10px", padding:"4px", backgroundColor:"#b30f13", color:"white", fontSize:"20px" }} onClick={()=> setFeatures("Alfalah PayPak: Rs 250,000. Alfalah Visa Classic: Rs 250,000. Alfalah Visa Gold: Rs 250,000. Pehchaan Debit Card: Rs 250,000. Alfalah Visa Platinum: Rs 250,000. Alfalah Visa Signature: Rs 250,000. Alfalah Premier Visa Signature: Rs 250,000. ")}> Funds Trasnfer</button>
                    </div>
          {features && (
  <div style={{ fontSize: "14px" }}>
    {features.split(/[.?]/).map((part, index) => (
      <div key={index}>
       {part.trim()} 
      </div>
    ))}
  </div>
)}
          </div>
        }
      </Modal>
      
      

      
      {questions.map((question, index) => (
        <div
          className="bg-sidbar-color p-2.5 flex items-center mb-3 mt-3 gap-4 rounded-3xl w-[480px]"
          key={index}
        >
          <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#FFD2D2]">
            <img src={QuestionMark} alt="logo" />
          </div>
          <p
            className="text-[#2C2A2B] text-[12px] cursor-pointer"
            // onClick={(e)=> sendMessage(e.target.textContent)}
            onClick={() => handleQuestionClick(question.question)}
          >
            {question.question}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SideBar;
