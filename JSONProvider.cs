using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Web;
using System.Web.Script.Serialization;

namespace PlanningWebApp
{
    
    public class JSONProvider
    {
        public static string GetOperations()
        {
            using (var cntx = new StoredProceduresDataContext())
            {
                return new JavaScriptSerializer().Serialize( cntx.P_PLN_WebGetOperatons() );   
            }
        }

        public static string GetCalendarDays()
        {
            using (var cntx = new StoredProceduresDataContext())
            {
                return new JavaScriptSerializer().Serialize(cntx.PLN_WebGetDays());
            }
        }

        internal static string GetPlanOperations(string workshop, DateTime fromDate, DateTime toDate)
        {
            using (var cntx = new StoredProceduresDataContext("Data Source=srv-dbs;Initial Catalog=gmprint_zmv;Integrated Security=True"))
            {
                return new JavaScriptSerializer().Serialize(cntx.P_PLN_GetPlanOperations(Convert.ToInt32(workshop), fromDate, toDate));
            }
        }
    }
}