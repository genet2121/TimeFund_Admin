export default interface FundraiserReport {
  fundraiserReport_id: number;
  fullName: string;
  country: string;
  phoneNumber: string;
  emailAddress: string;
  fundraiserUrl: string;
  howDoYouKnow: string;
  whyRefund: string;
  concerns: string;
  howDoYouKnowOrganizer: string;
  currency: string;
  amountReceived: number;
  reasonNoFunds: string;
  reasonvideo_or_image: string;
  image_or_video: string;
  descriptions: string;
  evidence: string;
  createdAt: string;
  updatedAt: string;
  status: 'resolved' | 'unresolved';
  ReportResponses: [];
}
