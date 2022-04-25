import Request from '../../helpers/Request';
import SessionHelper from '../../helpers/SessionHelper';

const getUser = () => {
  return SessionHelper.getUser();
}

export const getPersonalGoals = async (start, end) => {
  const params = {
    startDate: start,
    endDate: end
  }
  const resp = await Request('get', '/api/inspection-goals/statistics/user/' + SessionHelper.getUser()?.id, null, params);
  return resp.data;
}

/**
 * Gets the data for the admin to see on the dashboard pie charts.
 * @returns {obj} the json object
 */
 export const getInspections = async (start, end, company, department, user) => {
  const params = {
    startDate: start,
    endDate: end,
    companyId: company ? company : undefined,
    userId: user ? user : undefined,
    departmentId: department ? department : undefined,
  }
  const resp = await Request('get', '/api/inspections/count-by-status', null, params);
  return resp.data;
}

/**
 * Gets the unsuitable reports data for the pie charts on the dashboard.
 * @returns {obj} the json object
 */
export const getUnsuitData = async (start, end, user, company, department) => {
  const params = {
    startDate: start,
    endDate: end,
    departmentId: department ? department : undefined,
    userId: user ? user : undefined,
    companyId: company ? company : undefined
  }
  const resp = await Request('get', '/api/unsuitInspections/count-by-status', null, params);
  return resp.data;
}

/**
 * Gets the company data on a per user basis for company for the bar charts on the dashboard.
 * @returns {obj} the json object
 */
export const getInspectionDataPerUser = async (start, end, company, department) => {
  const params = {
    startDate: start,
    endDate: end,
    companyId: company ? company : undefined,
    departmentId: department ? department : undefined,
  }
  const resp = await Request('get', '/api/inspections/count-by-status-per-user', null, params);
  return resp.data;
}

/**
 * Gets the unsuit inspection data on a per user basis for department for the bar charts on the dashboard.
 * @returns {obj} the json object
 */
export const getUnsuitDataPerUser = async (start, end, company, department) => {
  const params = {
    startDate: start,
    endDate: end,
    departmentId: department ? department : undefined,
    companyId: company ? company : undefined
  }
  const resp = await Request('get', '/api/unsuitInspections/count-by-status-per-user', null, params);
  return resp.data;
}

/**
 * Gets the company data on a per department basis for the bar charts on the dashboard.
 * @returns {obj} the json object
 */
export const getBarDataPerDepartment = async (start, end) => {
  const params = {
    startDate: start,
    endDate: end
  }
  const companyID = getUser()?.companyId;
  const resp = await Request('get', '/api/inspections/count-by-status-per-department-for-company/' + companyID, null, params);
  return resp.data;
}

export const getTasksPerDate = async (end) => {
  const date = end.add(-3, "hours");
  const params = {
    year: date.year(),
    month: date.month() + 1
  }
  const resp = await Request('get', '/api/inspections/' + getUser()?.companyId + '/monthly-stats-graph', null, params);
  return resp.data;
}

/* GOAL CHARTS */
export const eventPerTypeForDepartment = async (start, end, department) => {
  if (department) {
    const params = {
      startDate: start,
      endDate: end,
      "department-id": department// ? department : getUser()?.department?.id
    }
    const resp = await Request('get', '/api/inspection-goals/statistics/general/', null, params);
    return resp.data;
  }
}

export const eventPerTypePerUserForDepartment = async (start, end, department) => {
  if (department) {
    const params = {
      startDate: start,
      endDate: end,
      "department-id": department// ? department : getUser()?.department?.id
    }
    const resp = await Request('get', '/api/inspection-goals/statistics/general/per-user', null, params);
    return resp.data;
  }
}