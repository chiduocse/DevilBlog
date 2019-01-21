using System;
using System.Collections.Generic;
using System.Text;

namespace DevilBlog.Models.Models
{
    public class Country
    {
        public int Id { get; set; }
        public string CountryName { get; set; }
        public string CountryCode { get; set; }
        public string IsoAlpha2Code { get; set; }
        public string IsoAlpha3Code { get; set; }
        public string Culture { get; set; }
        public string Flag { get; set; }
        public virtual List<Resource> Resources { get; set; }
    }
}
