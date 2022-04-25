import SessionHelper from "./SessionHelper";

let authorizationLookup = {};
const user = SessionHelper.getUser();

// const resp = Request("get", "/api/auth/get-authorization-list");
// resp.then((val) => {
//   console.log(val);
// })

authorizationLookup.dashboard = {
  "ROLE_SİSTEM_ADMİNİ": {
    personalGoals: true,
    personalTasks: true,
    personalUnsuitTasks: true,
    departmentTasks: true,
    companyTasks: true,
    departmentUnsuitTasks: true,
    companyUnsuitTasks: true,
    departmentTasksPerUser: true,
    companyTasksPerUser: true,
    departmentUnsuitTasksPerUser: true,
    companyUnsuitTasksPerUser: true,
    tasksPerDepartment: true,
    tasksPerDate: true
  },
  "ROLE_YAŞAM_GÜVENLİĞİ_KOMİTESİ_YÖNETİCİSİ": {
    personalGoals: true,
    personalTasks: true,
    personalUnsuitTasks: true,
    departmentTasks: true,
    companyTasks: true,
    departmentUnsuitTasks: true,
    companyUnsuitTasks: true,
    departmentTasksPerUser: true,
    companyTasksPerUser: true,
    departmentUnsuitTasksPerUser: true,
    companyUnsuitTasksPerUser: true,
    tasksPerDepartment: true,
    tasksPerDate: true
  },
  "ROLE_ISG_UZMANI": {
    personalGoals: true,
    personalTasks: true,
    personalUnsuitTasks: true,
    departmentTasks: true,
    companyTasks: true,
    departmentUnsuitTasks: true,
    companyUnsuitTasks: true,
    departmentTasksPerUser: true,
    companyTasksPerUser: true,
    departmentUnsuitTasksPerUser: true,
    companyUnsuitTasksPerUser: true,
    tasksPerDepartment: true,
    tasksPerDate: true
  },
  "ROLE_YONETSEL_BIRIM_YONETICISI": {
    personalGoals: true,
    personalTasks: true,
    personalUnsuitTasks: true,
    departmentTasks: true,
    companyTasks: true,
    departmentUnsuitTasks: true,
    companyUnsuitTasks: true,
    departmentTasksPerUser: true,
    companyTasksPerUser: true,
    departmentUnsuitTasksPerUser: true,
    companyUnsuitTasksPerUser: true,
    tasksPerDepartment: true,
    tasksPerDate: false
  },
  "ROLE_YONETSEL_BIRIM_PERSONELI": {
    personalGoals: true,
    personalTasks: true,
    personalUnsuitTasks: true,
    departmentTasks: true,
    companyTasks: false,
    departmentUnsuitTasks: true,
    companyUnsuitTasks: false,
    departmentTasksPerUser: true,
    companyTasksPerUser: false,
    departmentUnsuitTasksPerUser: true,
    companyUnsuitTasksPerUser: false,
    tasksPerDepartment: false,
    tasksPerDate: false
  },
  "ROLE_OPERASYONEL_BİRİM_YÖNETİCİSİ": {
    personalGoals: true,
    personalTasks: true,
    personalUnsuitTasks: true,
    departmentTasks: true,
    companyTasks: true,
    departmentUnsuitTasks: true,
    companyUnsuitTasks: true,
    departmentTasksPerUser: true,
    companyTasksPerUser: true,
    departmentUnsuitTasksPerUser: true,
    companyUnsuitTasksPerUser: true,
    tasksPerDepartment: true,
    tasksPerDate: false
  },
  "ROLE_OPERASYONEL_BİRİM_PERSONELİ": {
    personalGoals: true,
    personalTasks: true,
    personalUnsuitTasks: true,
    departmentTasks: true,
    companyTasks: false,
    departmentUnsuitTasks: true,
    companyUnsuitTasks: false,
    departmentTasksPerUser: true,
    companyTasksPerUser: false,
    departmentUnsuitTasksPerUser: true,
    companyUnsuitTasksPerUser: false,
    tasksPerDepartment: false,
    tasksPerDate: false
  },
  "ROLE_YUKLENICI_YÖNETİCİ": {
    personalGoals: true,
    personalTasks: true,
    personalUnsuitTasks: true,
    departmentTasks: true,
    companyTasks: true,
    departmentUnsuitTasks: true,
    companyUnsuitTasks: true,
    departmentTasksPerUser: true,
    companyTasksPerUser: true,
    departmentUnsuitTasksPerUser: true,
    companyUnsuitTasksPerUser: true,
    tasksPerDepartment: true,
    tasksPerDate: false
  },
  "ROLE_YUKLENICI_PERSONEL": {
    personalGoals: true,
    personalTasks: true,
    personalUnsuitTasks: true,
    departmentTasks: true,
    companyTasks: false,
    departmentUnsuitTasks: true,
    companyUnsuitTasks: false,
    departmentTasksPerUser: true,
    companyTasksPerUser: false,
    departmentUnsuitTasksPerUser: true,
    companyUnsuitTasksPerUser: false,
    tasksPerDepartment: false,
    tasksPerDate: false
  },
  "ROLE_YUKLENICI_ISG_UZMANI": {
    personalGoals: true,
    personalTasks: true,
    personalUnsuitTasks: true,
    departmentTasks: true,
    companyTasks: true,
    departmentUnsuitTasks: true,
    companyUnsuitTasks: true,
    departmentTasksPerUser: true,
    companyTasksPerUser: true,
    departmentUnsuitTasksPerUser: true,
    companyUnsuitTasksPerUser: true,
    tasksPerDepartment: true,
    tasksPerDate: false
  },
  "ROLE_YUKLENICI_OSGB_ISG_UZMANI": {
    personalGoals: true,
    personalTasks: true,
    personalUnsuitTasks: true,
    departmentTasks: true,
    companyTasks: true,
    departmentUnsuitTasks: true,
    companyUnsuitTasks: true,
    departmentTasksPerUser: true,
    companyTasksPerUser: true,
    departmentUnsuitTasksPerUser: true,
    companyUnsuitTasksPerUser: true,
    tasksPerDepartment: true,
    tasksPerDate: false
  },
  "ROLE_OSGB_ISG_UZMANI": {
    personalGoals: true,
    personalTasks: true,
    personalUnsuitTasks: true,
    departmentTasks: true,
    companyTasks: true,
    departmentUnsuitTasks: true,
    companyUnsuitTasks: true,
    departmentTasksPerUser: true,
    companyTasksPerUser: true,
    departmentUnsuitTasksPerUser: true,
    companyUnsuitTasksPerUser: true,
    tasksPerDepartment: true,
    tasksPerDate: false
  },
  "ROLE_YAŞAM_GÜVENLİĞİ_KOMİTESİ_UYESİ": {
    personalGoals: true,
    personalTasks: true,
    personalUnsuitTasks: true,
    departmentTasks: true,
    companyTasks: true,
    departmentUnsuitTasks: true,
    companyUnsuitTasks: true,
    departmentTasksPerUser: true,
    companyTasksPerUser: true,
    departmentUnsuitTasksPerUser: true,
    companyUnsuitTasksPerUser: true,
    tasksPerDepartment: true,
    tasksPerDate: false
  },
  "ROLE_BÖLGE_MÜDÜRÜ": {
    personalGoals: true,
    personalTasks: true,
    personalUnsuitTasks: true,
    departmentTasks: true,
    companyTasks: true,
    departmentUnsuitTasks: true,
    companyUnsuitTasks: true,
    departmentTasksPerUser: true,
    companyTasksPerUser: true,
    departmentUnsuitTasksPerUser: true,
    companyUnsuitTasksPerUser: true,
    tasksPerDepartment: true,
    tasksPerDate: false
  },
  "ROLE_YÜKLENİCİ_OSGB_SAĞLIK_PERSONELİ": {
    personalGoals: false,
    personalTasks: false,
    personalUnsuitTasks: false,
    departmentTasks: false,
    companyTasks: false,
    departmentUnsuitTasks: false,
    companyUnsuitTasks: false,
    departmentTasksPerUser: false,
    companyTasksPerUser: false,
    departmentUnsuitTasksPerUser: false,
    companyUnsuitTasksPerUser: false,
    tasksPerDepartment: false,
    tasksPerDate: false
  },  
  "ROLE_OSGB_SAĞLIK_PERSONELİ": {
    personalGoals: false,
    personalTasks: false,
    personalUnsuitTasks: false,
    departmentTasks: false,
    companyTasks: false,
    departmentUnsuitTasks: false,
    companyUnsuitTasks: false,
    departmentTasksPerUser: false,
    companyTasksPerUser: false,
    departmentUnsuitTasksPerUser: false,
    companyUnsuitTasksPerUser: false,
    tasksPerDepartment: false,
    tasksPerDate: false
  },    
  "ROLE_SAĞLIK_PERSONELİ": {
    personalGoals: false,
    personalTasks: false,
    personalUnsuitTasks: false,
    departmentTasks: false,
    companyTasks: false,
    departmentUnsuitTasks: false,
    companyUnsuitTasks: false,
    departmentTasksPerUser: false,
    companyTasksPerUser: false,
    departmentUnsuitTasksPerUser: false,
    companyUnsuitTasksPerUser: false,
    tasksPerDepartment: false,
    tasksPerDate: false
  }               
};

// EXAMPLE AUTHORIZATION TABLE
/* authorizationLookup.taskTable = {
    "ROLE_SİSTEM_ADMİNİ":                       {view: true, create: true, edit: false, delete: true},
    "ROLE_YAŞAM_GÜVENLİĞİ_KOMİTESİ_YÖNETİCİSİ": {view: true, create: true, edit: false, delete: true},
    "ROLE_ISG_UZMANI":                          {view: true, create: false, edit: false, delete: true},
    "ROLE_YONETSEL_BIRIM_YONETICISI":           {view: true, create: false, edit: false, delete: true},
    "ROLE_YONETSEL_BIRIM_PERSONELI":            {view: false, create: false, edit: false, delete: false},
    "ROLE_OPERASYONEL_BİRİM_YÖNETİCİSİ":        {view: true, create: false, edit: false, delete: true},
    "ROLE_OPERASYONEL_BİRİM_PERSONELİ":         {view: false, create: false, edit: false, delete: false},
    "ROLE_YUKLENICI_YÖNETİCİ":                  {view: true, create: false, edit: false, delete: false},
    "ROLE_YUKLENICI_PERSONEL":                  {view: true, create: false, edit: false, delete: false},
    "ROLE_YUKLENICI_ISG_UZMANI":                {view: true, create: false, edit: false, delete: false},
    "ROLE_YUKLENICI_OSGB_ISG_UZMANI":           {view: true, create: false, edit: false, delete: false},
    "ROLE_OSGB_ISG_UZMANI":                     {view: true, create: false, edit: false, delete: true},
    "ROLE_YAŞAM_GÜVENLİĞİ_KOMİTESİ_UYESİ":      {view: true, create: false, edit: false, delete: true},
    "ROLE_BÖLGE_MÜDÜRÜ":                        {view: true, create: true, edit: false, delete: true},
    "ROLE_YÜKLENİCİ_OSGB_SAĞLIK_PERSONELİ":     {view: false, create: false, delete: false, edit: false},
    "ROLE_OSGB_SAĞLIK_PERSONELİ":               {view: false, create: false, delete: false, edit: false},
    "ROLE_SAĞLIK_PERSONELİ":                    {view: false, create: false, delete: false, edit: false}
}; */

export function getLookup() {
  return authorizationLookup;
}

export function getViewAuthorizationForAll(roles) {
  // authorizationLookup.resp = await Request("get", "/api/auth/get-authorization-list");
  // console.log(resp);
  // authorizationLookup.array = resp.data;
  // let authorization = {};
  // for(let i = 0; i < array.length; i++) {
  //   if(array[i]?.page === page) {
  //     authorizationLookup.authList = array[i]?.authorizationList;
  //     for(let j = 0; j < authList.length; j++) {
  //       if(authList[j] === "READ") {authorization.view = true}
  //       else if(authList[j] === "CREATE") {authorization.create = true}
  //       else if(authList[j] === "DELETE") {authorization.delete = true}
  //       else if(authList[j] === "GOALS") {authorization.goals = true}
  //       else if(authList[j] === "ASSIGN") {authorization.assign = true}
  //       else if(authList[j] === "EDIT") {authorization.edit = true}
  //       else if(authList[j] === "APPROVE") {authorization.approve = true}
  //       else if(authList[j] === "EXPORT") {authorization.export = true}
  //       else if(authList[j] === "EXPORT_ALL") {authorization.exportAll = true}
  //     }
  //   }
  // }

  let authorization = {};
  for(let i = 0; i < roles.length; i++) {
    for(let page in authorizationLookup){
      if(page !== "dashboard") {
        authorization[page] = authorization[page] ? true : authorizationLookup[page][roles[i]].view;
      }
    }
  }
  return authorization;
}

export function getAuthorizationForPage(roles, page) {
  // const resp = await Request("get", "/api/auth/get-authorization-list");
  // console.log(resp);
  // const array = resp.data;
  // let authorization = {};

  // for(let i = 0; i < array.length; i++) {
  //   if(array[i]?.page === page) {
  //     const authList = array[i]?.authorizationList;
  //     for(let j = 0; j < authList.length; j++) {
  //       if(authList[j] === "READ") {authorization.view = true}
  //       else if(authList[j] === "CREATE") {authorization.create = true}
  //       else if(authList[j] === "DELETE") {authorization.delete = true}
  //       else if(authList[j] === "GOALS") {authorization.goals = true}
  //       else if(authList[j] === "ASSIGN") {authorization.assign = true}
  //       else if(authList[j] === "EDIT") {authorization.edit = true}
  //       else if(authList[j] === "APPROVE") {authorization.approve = true}
  //       else if(authList[j] === "EXPORT") {authorization.export = true}
  //       else if(authList[j] === "EXPORT_ALL") {authorization.exportAll = true}
  //     }
  //   }
  // }

  let authorization = {};
  for(let i = 0; i < roles.length; i++) {
    for(let prop in authorizationLookup[page][roles[i]]) {
      authorization[prop] = authorization[prop] ? true : authorizationLookup[page][roles[i]][prop];
    }
  }
  return authorization;
}