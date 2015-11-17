using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using FouMemorizer.Models;
using Microsoft.AspNet.Identity;

namespace FouMemorizer.Controllers
{
    public class MemosController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Memos
        [Authorize]
        public IQueryable<Memo> GetMemos()
        {
            string currentUserId = User.Identity.GetUserId();
            return db.Memos.Where(m => m.UserID == currentUserId).OrderByDescending(m => m.CreationDate);
        }

        // POST: api/Memos
        [ResponseType(typeof(Memo))]
        [Authorize]
        public IHttpActionResult PostMemo(Memo memo)
        {
            if (!ModelState.IsValid || memo == null)
            {
                return BadRequest(ModelState);
            }

            string currentUserId = User.Identity.GetUserId();
            ApplicationUser user = db.Users.FirstOrDefault(u => u.Id == currentUserId);

            memo.User = user;
            memo.CreationDate = DateTime.Now;

            db.Memos.Add(memo);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = memo.MemoID }, memo);
        }

        // DELETE: api/Memos/5
        [ResponseType(typeof(Memo))]
        [Authorize]
        public IHttpActionResult DeleteMemo(int id)
        {
            Memo memo = db.Memos.Find(id);
            if (memo == null)
            {
                return NotFound();
            }

            string currentUserId = User.Identity.GetUserId();

            if (memo.UserID != currentUserId)
            {
                return Unauthorized();
            }

            db.Memos.Remove(memo);
            db.SaveChanges();

            return Ok(memo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MemoExists(int id)
        {
            return db.Memos.Count(e => e.MemoID == id) > 0;
        }
    }
}