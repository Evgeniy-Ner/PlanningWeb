using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace PlanningWebApp
{
    /// <summary>
    /// Summary description for getObject
    /// </summary>
    public class getObject : IHttpHandler
    {

        static string workshop = "1";

        static DateTime fromDate;

        static DateTime toDate;

        public void ProcessRequest(HttpContext context)
        {
            string json = "";

            string parameter = context.Request.QueryString["object"];

            workshop = context.Request.QueryString["workshop"];

            try
            {
               fromDate =  GetDateFromString(context.Request.QueryString["fromDate"]);

               toDate = GetDateFromString(context.Request.QueryString["toDate"]);
            }
            catch(Exception ex)
            {

            }

            json = GetJSONByParameter(json, parameter);

            context.Response.ContentType = "application/json; charset=utf-8";
            context.Response.Write(json);
            context.Response.End();
        }

        private static DateTime GetDateFromString(string strfromDate)
        {
            DateTime d;
            var matches = Regex.Matches(strfromDate, @"[0-9]+");

            int year = Convert.ToInt32(matches[0].Value);
            int month = Convert.ToInt32(matches[1].Value);
            int day = Convert.ToInt32(matches[2].Value);

            d = new DateTime(year, month, day);
            return d;
        }

        private static string GetJSONByParameter(string json, string parameter)
        {
            switch (parameter)
            {
                case "CalendarDays":
                    json = PlanningWebApp.JSONProvider.GetCalendarDays();
                    break;
                case "Operations":
                    json = PlanningWebApp.JSONProvider.GetOperations();
                    break;

                case "PlanOperations":
                    json = PlanningWebApp.JSONProvider.GetPlanOperations(workshop, fromDate, toDate);
                    break;
            }
            return json;
        }


        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}