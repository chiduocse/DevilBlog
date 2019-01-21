using System;
using System.Collections.Generic;
using System.Text;

namespace DevilBlog.Models.Models
{
    public class Resource
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public virtual Country Country { get; set; }
    }
}
