using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LifeLineApi.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Application_Admin",
                columns: table => new
                {
                    AA_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AA_UserName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true),
                    AA_Email = table.Column<string>(type: "varchar(60)", unicode: false, maxLength: 60, nullable: true),
                    AA_Password = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Applicat__509C98E66D8C254A", x => x.AA_ID);
                });

            migrationBuilder.CreateTable(
                name: "Hospital",
                columns: table => new
                {
                    H_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    H_Name = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    H_Address = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    H_Email = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    H_Password = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    HL_Latitude = table.Column<double>(type: "float", nullable: true),
                    HL_Longitude = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Hospital__61F3893D78B274C2", x => x.H_ID);
                });

            migrationBuilder.CreateTable(
                name: "Blood_Availability",
                columns: table => new
                {
                    BA_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BA_H_ID = table.Column<int>(type: "int", nullable: true),
                    BA_BloodGroup = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: true),
                    BA_BottlesAvailable = table.Column<int>(type: "int", nullable: true),
                    BA_Date = table.Column<DateTime>(type: "date", nullable: true),
                    BA_Time = table.Column<TimeSpan>(type: "time", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Blood_Av__6DFCF7B82E636F43", x => x.BA_ID);
                    table.ForeignKey(
                        name: "FK__Blood_Ava__BA_H___59FA5E80",
                        column: x => x.BA_H_ID,
                        principalTable: "Hospital",
                        principalColumn: "H_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Doctors",
                columns: table => new
                {
                    D_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    D_H_ID = table.Column<int>(type: "int", nullable: true),
                    D_Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    D_Email = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    D_Password = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    D_Mobile = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: true),
                    D_Field = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    D_AvailablityStatus = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: true),
                    d_image = table.Column<string>(type: "varchar(450)", unicode: false, maxLength: 450, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Doctors__76B8FF7DAC4F92E9", x => x.D_ID);
                    table.ForeignKey(
                        name: "FK__Doctors__D_H_ID__4D94879B",
                        column: x => x.D_H_ID,
                        principalTable: "Hospital",
                        principalColumn: "H_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Emergency_Contact",
                columns: table => new
                {
                    EC_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EC_H_ID = table.Column<int>(type: "int", nullable: true),
                    EC_Number1 = table.Column<string>(type: "nvarchar(12)", maxLength: 12, nullable: true),
                    EC_Number2 = table.Column<string>(type: "nvarchar(12)", maxLength: 12, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Emergenc__46237E5951031F2D", x => x.EC_ID);
                    table.ForeignKey(
                        name: "FK__Emergency__EC_H___6B24EA82",
                        column: x => x.EC_H_ID,
                        principalTable: "Hospital",
                        principalColumn: "H_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "H_Employee",
                columns: table => new
                {
                    HE_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HE_H_ID = table.Column<int>(type: "int", nullable: true),
                    HE_Name = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true),
                    HE_Email = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    HE_Password = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    HE_Role = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__H_Employ__692EA79EF70025B5", x => x.HE_ID);
                    table.ForeignKey(
                        name: "FK__H_Employe__HE_H___571DF1D5",
                        column: x => x.HE_H_ID,
                        principalTable: "Hospital",
                        principalColumn: "H_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Appointments",
                columns: table => new
                {
                    A_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    A_H_ID = table.Column<int>(type: "int", nullable: true),
                    A_D_ID = table.Column<int>(type: "int", nullable: true),
                    A_PatientName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    A_PatientDOB = table.Column<DateTime>(type: "date", nullable: true),
                    A_Date = table.Column<DateTime>(type: "date", nullable: true),
                    A_Time = table.Column<TimeSpan>(type: "time", nullable: true),
                    A_Mobile = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: true),
                    A_Email = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    A_Type = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: true),
                    A_Reason = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Appointm__71AC6D412B7481FC", x => x.A_ID);
                    table.ForeignKey(
                        name: "FK__Appointme__A_D_I__5165187F",
                        column: x => x.A_D_ID,
                        principalTable: "Doctors",
                        principalColumn: "D_ID");
                    table.ForeignKey(
                        name: "FK__Appointme__A_H_I__5070F446",
                        column: x => x.A_H_ID,
                        principalTable: "Hospital",
                        principalColumn: "H_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    P_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    P_D_ID = table.Column<int>(type: "int", nullable: true),
                    P_Name = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    P_DOB = table.Column<DateTime>(type: "date", nullable: true),
                    P_Mobile = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: true),
                    P_Date = table.Column<DateTime>(type: "date", nullable: true),
                    P_Time = table.Column<TimeSpan>(type: "time", nullable: true),
                    P_A_Status = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    P_Reason = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    P_Email = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    P_Password = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Patients__A3420A77592C4340", x => x.P_ID);
                    table.ForeignKey(
                        name: "FK__Patients__P_D_ID__5441852A",
                        column: x => x.P_D_ID,
                        principalTable: "Doctors",
                        principalColumn: "D_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Doctor_Prescription",
                columns: table => new
                {
                    DP_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DP_D_ID = table.Column<int>(type: "int", nullable: true),
                    DP_P_ID = table.Column<int>(type: "int", nullable: true),
                    DP_Date = table.Column<DateTime>(type: "datetime", nullable: true),
                    DP_Disease = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Doctor_P__7E732EA09FF169F0", x => x.DP_ID);
                    table.ForeignKey(
                        name: "FK__Doctor_Pr__DP_D___5CD6CB2B",
                        column: x => x.DP_D_ID,
                        principalTable: "Doctors",
                        principalColumn: "D_ID");
                    table.ForeignKey(
                        name: "FK__Doctor_Pr__DP_P___5DCAEF64",
                        column: x => x.DP_P_ID,
                        principalTable: "Patients",
                        principalColumn: "P_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Feedback",
                columns: table => new
                {
                    F_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    F_D_ID = table.Column<int>(type: "int", nullable: true),
                    F_P_ID = table.Column<int>(type: "int", nullable: true),
                    F_Rating = table.Column<int>(type: "int", nullable: true),
                    F_Comments = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Feedback__2C6EC7C3D9F307C6", x => x.F_ID);
                    table.ForeignKey(
                        name: "FK__Feedback__F_D_ID__60A75C0F",
                        column: x => x.F_D_ID,
                        principalTable: "Doctors",
                        principalColumn: "D_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__Feedback__F_P_ID__619B8048",
                        column: x => x.F_P_ID,
                        principalTable: "Patients",
                        principalColumn: "P_ID");
                });

            migrationBuilder.CreateTable(
                name: "Video_Consultation",
                columns: table => new
                {
                    VC_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VC_P_ID = table.Column<int>(type: "int", nullable: true),
                    VC_D_ID = table.Column<int>(type: "int", nullable: true),
                    VC_Date = table.Column<DateTime>(type: "date", nullable: true),
                    VC_Time = table.Column<TimeSpan>(type: "time", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Video_Co__FFB4AD255FFE2FE3", x => x.VC_ID);
                    table.ForeignKey(
                        name: "FK__Video_Con__VC_D___6477ECF3",
                        column: x => x.VC_D_ID,
                        principalTable: "Doctors",
                        principalColumn: "D_ID");
                    table.ForeignKey(
                        name: "FK__Video_Con__VC_P___656C112C",
                        column: x => x.VC_P_ID,
                        principalTable: "Patients",
                        principalColumn: "P_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Prescription_Medications",
                columns: table => new
                {
                    PM_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PM_DP_ID = table.Column<int>(type: "int", nullable: true),
                    PM_Medicine = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    PM_Dosage = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    PM_ScheduleTime = table.Column<TimeSpan>(type: "time", nullable: true),
                    PM_StartDate = table.Column<DateTime>(type: "date", nullable: true),
                    PM_EndDate = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Prescrip__8E8EC70B6630E1AA", x => x.PM_ID);
                    table.ForeignKey(
                        name: "FK__Prescript__PM_DP__68487DD7",
                        column: x => x.PM_DP_ID,
                        principalTable: "Doctor_Prescription",
                        principalColumn: "DP_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Medical_Portfolio",
                columns: table => new
                {
                    MP_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MP_P_ID = table.Column<int>(type: "int", nullable: true),
                    MP_DP_ID = table.Column<int>(type: "int", nullable: true),
                    MP_PM_ID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Medical___D12FC71573D6D922", x => x.MP_ID);
                    table.ForeignKey(
                        name: "FK__Medical_P__MP_DP__6E01572D",
                        column: x => x.MP_DP_ID,
                        principalTable: "Doctor_Prescription",
                        principalColumn: "DP_ID");
                    table.ForeignKey(
                        name: "FK__Medical_P__MP_PM__6FE99F9F",
                        column: x => x.MP_PM_ID,
                        principalTable: "Prescription_Medications",
                        principalColumn: "PM_ID");
                    table.ForeignKey(
                        name: "FK__Medical_P__MP_P___6EF57B66",
                        column: x => x.MP_P_ID,
                        principalTable: "Patients",
                        principalColumn: "P_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_A_D_ID",
                table: "Appointments",
                column: "A_D_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_A_H_ID",
                table: "Appointments",
                column: "A_H_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Blood_Availability_BA_H_ID",
                table: "Blood_Availability",
                column: "BA_H_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Doctor_Prescription_DP_D_ID",
                table: "Doctor_Prescription",
                column: "DP_D_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Doctor_Prescription_DP_P_ID",
                table: "Doctor_Prescription",
                column: "DP_P_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_D_H_ID",
                table: "Doctors",
                column: "D_H_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Emergency_Contact_EC_H_ID",
                table: "Emergency_Contact",
                column: "EC_H_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Feedback_F_D_ID",
                table: "Feedback",
                column: "F_D_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Feedback_F_P_ID",
                table: "Feedback",
                column: "F_P_ID");

            migrationBuilder.CreateIndex(
                name: "IX_H_Employee_HE_H_ID",
                table: "H_Employee",
                column: "HE_H_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Medical_Portfolio_MP_DP_ID",
                table: "Medical_Portfolio",
                column: "MP_DP_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Medical_Portfolio_MP_P_ID",
                table: "Medical_Portfolio",
                column: "MP_P_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Medical_Portfolio_MP_PM_ID",
                table: "Medical_Portfolio",
                column: "MP_PM_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Patients_P_D_ID",
                table: "Patients",
                column: "P_D_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Prescription_Medications_PM_DP_ID",
                table: "Prescription_Medications",
                column: "PM_DP_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Video_Consultation_VC_D_ID",
                table: "Video_Consultation",
                column: "VC_D_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Video_Consultation_VC_P_ID",
                table: "Video_Consultation",
                column: "VC_P_ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Application_Admin");

            migrationBuilder.DropTable(
                name: "Appointments");

            migrationBuilder.DropTable(
                name: "Blood_Availability");

            migrationBuilder.DropTable(
                name: "Emergency_Contact");

            migrationBuilder.DropTable(
                name: "Feedback");

            migrationBuilder.DropTable(
                name: "H_Employee");

            migrationBuilder.DropTable(
                name: "Medical_Portfolio");

            migrationBuilder.DropTable(
                name: "Video_Consultation");

            migrationBuilder.DropTable(
                name: "Prescription_Medications");

            migrationBuilder.DropTable(
                name: "Doctor_Prescription");

            migrationBuilder.DropTable(
                name: "Patients");

            migrationBuilder.DropTable(
                name: "Doctors");

            migrationBuilder.DropTable(
                name: "Hospital");
        }
    }
}
