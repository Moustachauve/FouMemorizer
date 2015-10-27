using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FouMemorizer.Models
{
    public class Memo
    {
        public int MemoID { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime CreationDate { get; set; }

		public ApplicationUser User { get; set; }
    }
}