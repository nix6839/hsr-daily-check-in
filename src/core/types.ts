interface SuccessBody {
  retcode: 0;
  message: 'OK';
  data: {
    code: '';
    risk_code: 0;
    gt: '';
    challenge: '';
    success: 0;
    is_risk: false;
  };
}

interface AlreadyCheckInBody {
  retcode: -5003;
  message: string;
  data: null;
}

export type ResponseBody = SuccessBody | AlreadyCheckInBody;
