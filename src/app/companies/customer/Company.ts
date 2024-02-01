export class Company

{
  companyId=0;
  companyName="";
  companyCode?="";
  companyTypeId=0;
  companyTypeName?="";
  parentCompanyId?=0;
  email= null;
  website=null;
  notes?="";
  createdBy?=null;
  dateCreated?=null;
  modifiedBy?=null;
  dateModified?=null;
  deletedBy?= null;
  dateDeleted?= null;
  isDeleted?= false;
  officeId?= 0;
  gsttypeId= "";
  gstin= "";
  pan= "";
  paymentTermId= 0;
  paymentTermLabel="";
  gsttypeName="";
  companyApprovalStatus="";
  ownerId?= 0;
  cafReceived?= null;
  cafReceivedDate?= null;
  creditDays?= null;
  mepzCode?= null;
  pannumber?= null;
  companyAddresses?= [];
  companyBankAccounts?= [];
  companyDocument1s?= [];
  companyDocuments?= [];
  companyPhones?= [];
  companyType?= null;
  contacts?= [];
  opportunities?= [];
  userMasters?= [];
  userOfficeAccesses?= []
  }