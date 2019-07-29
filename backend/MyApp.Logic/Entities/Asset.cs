using Reusable.Attachments;
using Reusable.CRUD.Contract;
using Reusable.CRUD.Entities;
using Reusable.CRUD.JsonEntities;
using ServiceStack;
using ServiceStack.DataAnnotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApp.Logic.Entities
{
    public class Asset : BaseEntity
    {
        public Asset()
        {
            
            ///start:slot:ctor<<<///end:slot:ctor<<<
        }

        public string CPUName { get; set; }
        public string Model { get; set; }
        public string SerialNumber { get; set; }
        public string Ram { get; set; }
        public string CPU { get; set; }
        public string Location { get; set; }
        public string Usuario { get; set; }

        ///start:slot:properties<<<///end:slot:properties<<<
    }
}
