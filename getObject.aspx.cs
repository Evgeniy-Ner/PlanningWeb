using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PlanningWebApp
{
    public partial class GetOperations : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string json = "";

            string parameter = Request.QueryString["object"];

            json = GetJSONByParameter(json, parameter);

            Response.Clear();
            Response.ContentType = "application/json; charset=utf-8";
            Response.Write(json);
            Response.End();

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
            }
            return json;
        }
    }
}