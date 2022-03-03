export const endpoint = {
  GET_TAXES: '/get-taxes',
};

export const assessmentRoll = {
  ADDRESS_INPUT:
    '#ctl00_ctl43_g_d30f33ca_a5a7_4f69_bb21_cd4abc25ea12_ctl00_txtSearch',
  BUTTON: '#ctl00_ctl43_g_d30f33ca_a5a7_4f69_bb21_cd4abc25ea12_ctl00_btnSearch',
  SELECT: '#ctl00_ctl43_g_d30f33ca_a5a7_4f69_bb21_cd4abc25ea12_ctl00_ddlSearch',
  TABLE:
    '#ctl00_ctl43_g_d30f33ca_a5a7_4f69_bb21_cd4abc25ea12_ctl00_gvAssessorRollTax',
  TIP: '#ctl00_ctl43_g_d30f33ca_a5a7_4f69_bb21_cd4abc25ea12_ctl00_lblTip',
  URL: 'https://arcc.sdcounty.ca.gov/Pages/Assessors-Roll-Tax.aspx',
};

export const assessmentTaxes = {
  INPUT_URL: 'https://specialassessments.sandiegocounty.gov/',
  PARCEL_INPUT:
    '#form1 > div > table > tbody > tr:nth-child(3) > td > center > p > input:nth-child(1)',
  PARCEL_SUBMIT: '#Submit',
  RESULTS_MELLO_ROOS:
    '#form1 > div > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(10) > td > table:nth-child(1)',
  RESULTS_OWNER:
    '#form1 > div > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3)',
  RESULTS_TAXES:
    '#form1 > div > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(7) > td > table',
  RESULTS_URL: 'https://specialassessments.sandiegocounty.gov/Results.asp',
};
