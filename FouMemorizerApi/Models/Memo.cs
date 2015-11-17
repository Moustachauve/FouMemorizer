using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace FouMemorizer.Models
{
    public class Memo
    {
        public int MemoID { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime CreationDate { get; set; }

        [ForeignKey("User")]
        public String UserID { get; set; }

        public ApplicationUser User { get; set; }
    }
}