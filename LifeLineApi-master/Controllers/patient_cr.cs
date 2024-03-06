using LifeLineApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Mail;

namespace LifeLineApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class patient_cr : ControllerBase
    {
        private readonly LifeLinedbContext _dbContext;

        public patient_cr(LifeLinedbContext dbContext)
        {
            _dbContext = dbContext;
        }
        //Contact Start
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> Getpatients()
        {
            if (_dbContext.Patients == null)
            {
                return NotFound();
            }
            var stud = await _dbContext.Patients.ToListAsync();

            return stud;
        }



        [HttpPost]

        public async Task<ActionResult<Patient>> PostPatient(Patient s)
        {
            var hospital = _dbContext.Doctors
.Where(x => x.DId == s.PDId)
.Select(x => x.DH)
.FirstOrDefault();

            var existingPatient = _dbContext.Patients
                .Where(x => x.PEmail == s.PEmail && x.PD.DH.HId == hospital.HId)
                .FirstOrDefault();

            if (existingPatient == null)
            {
                User t = new User();
                t.Email = s.PEmail;
                t.Password = s.PPassword;

                t.RoleId = 5;

                _dbContext.Users.Add(t);


                MailMessage mm = new MailMessage();
                mm.From = new MailAddress("aliyankhan6446@gmail.com");
                mm.To.Add(new MailAddress(s.PEmail));

                Random emailrandomnum = new Random();
                int emailrandomnumber = emailrandomnum.Next(1000, 10000);

                mm.Subject = "Login credentials";
                mm.Body = "Click On the following link to log into LifeLine";
                mm.Body = "Hi," + "<br/><br/>" + "We got request for  your account creation. Please click on the below link to Login an account" +
                    "<br/><br/> Password  is : " + emailrandomnumber + "<br/><br/>";
                mm.IsBodyHtml = true;

                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.Port = 587;
                smtp.EnableSsl = true;

                NetworkCredential nc = new NetworkCredential("aliyankhan6446@gmail.com", "rtnr piax mgbn xzyc");

                smtp.UseDefaultCredentials = true;
                smtp.Credentials = nc;
                smtp.UseDefaultCredentials = false;

                smtp.Send(mm);
                s.PPassword = emailrandomnumber.ToString();



                _dbContext.Patients.Add(s);

                _dbContext.SaveChanges();

                await _dbContext.SaveChangesAsync();

                return CreatedAtAction(nameof(Getpatients), new { id = s.PId }, s);
            }
            else
            {
                return StatusCode(403, "Patient with this Email already exists! ");
            }
        }

        [HttpPut]
        public async Task<ActionResult> PutPatient(int id, Patient s)
        {
            if (id != s.PId)
            {
                return BadRequest();
            }
            _dbContext.Entry(s).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {


                if (!HPatientAvailable(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        private bool HPatientAvailable(int id)
        {
            return (_dbContext.Patients?.Any(x => x.PId == id)).GetValueOrDefault();
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeletePatient(int id)
        {
            if (_dbContext.Patients == null)
            {
                return NotFound();
            }
            var stud = await _dbContext.Patients.FindAsync(id);

            if (stud == null)
            {
                return NotFound();
            }
            _dbContext.Patients.Remove(stud);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
        [HttpGet("patients")]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatients([FromQuery] int hospitalId)
        {
            try
            {
                // Fetch patients and include associated doctor and hospital information
                var patients = await _dbContext.Patients
                    .Where(p => p.PD != null && p.PD.DHId == hospitalId)
                    .Include(p => p.PD) // Include the doctor information
                        .ThenInclude(d => d.DH) // Include the hospital information for the doctor
                    .Select(p => new Patient
                    {
                        PId = p.PId,
                        PName = p.PName,
                        PDob = p.PDob,
                        PDate = p.PDate,
                        PMobile = p.PMobile,
                        PTime = p.PTime,
                        PReason = p.PReason,
                        PEmail = p.PEmail,
                        PDId = p.PDId,
                        PD = new Doctor
                        {
                            DId = p.PD.DId,
                            DName = p.PD.DName,
                            DField = p.PD.DField,
                            DHId = p.PD.DHId, // Assuming this property exists in your Doctor entity
                            DH = new Hospital
                            {
                                // Include the properties you want from the Hospital entity
                                HId = p.PD.DH.HId,
                                HName = p.PD.DH.HName,
                                HAddress = p.PD.DH.HAddress,
                                // Include other properties as needed
                            }
                        }
                    })
                    .ToListAsync();

                return Ok(patients);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
        [HttpGet("Docpre")]

        public ActionResult GetPrescriptionById(int id)
        {
            if (_dbContext.DoctorPrescriptions == null)
            {
                return NotFound();
            }
            var stud = _dbContext.DoctorPrescriptions.Where(x => x.DpPId == id).SingleOrDefault();

            if (stud == null)
            {
                return NotFound();
            }
            return Ok(stud);
        }

        [HttpPost("Accept(\"{id}\")")]
        public IActionResult AcceptAppointment(Patient p, int id)
        {
            try
            {
                var appointment = _dbContext.Appointments.Find(id);

                // Retrieve hospital information from the doctor associated with the appointment
                var hospital = _dbContext.Doctors
                    .Where(x => x.DId == appointment.ADId)
                    .Select(x => x.DH)
                    .FirstOrDefault();

               

                // Check if a patient with the same email exists in the same hospital
                var existingPatient = _dbContext.Patients
                    .Where(x => x.PEmail == appointment.AEmail && x.PD.DH.HId == hospital.HId)
                    .FirstOrDefault();

                if (existingPatient != null)
                {
                   

                    // Patient with the same email exists in the same hospital
                    // Return the existing patient's data with a message
                    return StatusCode(403, new { Message = "Patient with this Email already exists in the same hospital.", ExistingPatient = existingPatient });
                }



                p.PName = appointment.APatientName;
                p.PDId = appointment.ADId;
                p.PDob = appointment.APatientDob;
                p.PMobile = appointment.AMobile;
                p.PDate = DateTime.Now;
                p.PTime = DateTime.Now.TimeOfDay;
                p.PAStatus = "Accepted";
                p.PReason = "Appointment Accepted";
                p.PEmail = appointment.AEmail;
                MailMessage mm = new MailMessage();
                mm.From = new MailAddress("aliyankhan6446@gmail.com");
                mm.To.Add(new MailAddress(p.PEmail));
                
                Random emailrandomnum = new Random();
                int emailrandomnumber = emailrandomnum.Next(1000, 10000);

                mm.Subject = "Appointment Succesfull - LifeLine";
                mm.Body = "Click On the following link to log into LifeLine";
                mm.Body = "Hi," + "<br/><br/>" + "We got request for  your account creation. Please click on the below link to Login an account" +
                    "<br/><br/> Password  is : " + emailrandomnumber + "<br/><br/>" +
                        "<a href='http://localhost:5000/admin/Login'>Login Link</a>";
                mm.IsBodyHtml = true;

                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.Port = 587;
                smtp.EnableSsl = true;

                NetworkCredential nc = new NetworkCredential("aliyankhan6446@gmail.com", "rtnr piax mgbn xzyc");

                smtp.UseDefaultCredentials = true;
                smtp.Credentials = nc;
                smtp.UseDefaultCredentials = false;

                smtp.Send(mm);
                p.PPassword = emailrandomnumber.ToString();

                User t = new User();
                t.Email = p.PEmail;
                t.Password = p.PPassword;

                t.RoleId = 5;

                _dbContext.Users.Add(t);



                _dbContext.Patients.Add(p);
                _dbContext.Appointments.Remove(appointment);
                _dbContext.SaveChanges();

                return Ok("Appointment accepted successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error accepting appointment: {ex.Message}");
            }
        }

        [HttpGet("doctorpatient")]
        public async Task<ActionResult<IEnumerable<Patient>>> GetAcceptedPatients([FromQuery] int pdId)
        {
            try
            {
                // Fetch patients with PAStatus = 'Accepted' and include associated doctor and hospital information
                var patients = await _dbContext.Patients
                    .Where(p => p.PD != null && p.PAStatus == "Accepted" && p.PDId == pdId)
                    .Include(p => p.PD) // Include the doctor information
                        .ThenInclude(d => d.DH) // Include the hospital information for the doctor
                    .Select(p => new Patient
                    {
                        PId = p.PId,
                        PName = p.PName,
                        PDob = p.PDob,
                        PDate = p.PDate,
                        PMobile = p.PMobile,
                        PTime = p.PTime,
                        PReason = p.PReason,
                        PEmail = p.PEmail,
                        PDId = p.PDId,
                        PD = new Doctor
                        {
                            DId = p.PD.DId,
                            DName = p.PD.DName,
                            DField = p.PD.DField,
                            DHId = p.PD.DHId, // Assuming this property exists in your Doctor entity
                            DH = new Hospital
                            {
                                // Include the properties you want from the Hospital entity
                                HId = p.PD.DH.HId,
                                HName = p.PD.DH.HName,
                                HAddress = p.PD.DH.HAddress,
                                // Include other properties as needed
                            }
                        }
                    })
                    .ToListAsync();

                return Ok(patients);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }


    }
}

