﻿using api.Domain.Entities.MelloRoos;
using System.ComponentModel.DataAnnotations;

namespace api.Web.ViewModels.MelloRoos
{
    public class PropertyVM
    {
        [Required]
        public string Address { get; set; } = string.Empty;
        [Required]
        public string Owner { get; set; } = string.Empty;
        [Required]
        public string Parcel { get; set; } = string.Empty;
        public AssessmentVM? Assessment { get; set; }
        [Required]
        public TaxVM Tax { get; set; } = new TaxVM();
        [Required]
        public List<string> SearchTerms { get; set; } = new List<string>();

        public PropertyVM(Property prop)
        {
            Address = prop.Address;
            Owner = prop.Owner;
            Parcel = prop.Parcel;
            Assessment = getAssessment(prop.Assessment);
            Tax = new TaxVM(prop.Tax);
            SearchTerms = prop.SearchTerms.Select(st => st.Address).ToList();
        }

        public PropertyVM()
        {

        }

        private AssessmentVM? getAssessment(Assessment? assessment)
        {
            if (assessment == null)
            {
                return null;
            }

            return new AssessmentVM(assessment);
        }
    }
}
