using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevExtremeAspNetCoreApp1.Models {
    static class SampleData {
        public static List<EmployeeByState> DataGridEmployeesByState = new List<EmployeeByState> {
            new EmployeeByState {
                ID = 1,
                FirstName = "John",
                LastName = "Heart",
                Prefix = "Mr.",
                Position = "CTO",
                StateID = new List<int> {1 },
                CityID = new List<int> {1 }
            }
        };

        public static readonly List<State> StatesWithCities = new List<State> {
            new State {
                ID = 1,
                Name = "Alabama"
            },
            new State {
                ID = 2,
                Name = "Alaska"
            },
            new State {
                ID = 3,
                Name = "Arizona"
            },
            new State {
                ID = 4,
                Name = "Arkansas"
            },
            new State {
                ID = 5,
                Name = "California"
            }
        };

        public static List<CityByState> CitiesByState = new List<CityByState> {
            new CityByState {
                ID = 1,
                Name = "Tuscaloosa",
                StateID = 1
            },
            new CityByState {
                ID = 2,
                Name = "Hoover",
                StateID = 1
            },
            new CityByState {
                ID = 3,
                Name = "Dothan",
                StateID = 1
            },
            new CityByState {
                ID = 4,
                Name = "Decatur",
                StateID = 1
            },
            new CityByState {
                ID = 5,
                Name = "Anchorage",
                StateID = 2
            },
            new CityByState {
                ID = 6,
                Name = "Fairbanks",
                StateID = 2
            },
            new CityByState {
                ID = 7,
                Name = "Juneau",
                StateID = 2
            },
            new CityByState {
                ID = 8,
                Name = "Avondale",
                StateID = 3
            },
            new CityByState {
                ID = 9,
                Name = "Buckeye",
                StateID = 3
            },
            new CityByState {
                ID = 10,
                Name = "Carefree",
                StateID = 3
            },
            new CityByState {
                ID = 11,
                Name = "Springdale",
                StateID = 4
            },
            new CityByState {
                ID = 12,
                Name = "Rogers",
                StateID = 4
            },
            new CityByState {
                ID = 13,
                Name = "Sherwood",
                StateID = 4
            },
            new CityByState {
                ID = 14,
                Name = "Jacksonville",
                StateID = 4
            },
            new CityByState {
                ID = 15,
                Name = "Cabot",
                StateID = 4
            },
            new CityByState {
                ID = 16,
                Name = "Adelanto",
                StateID = 5
            },
            new CityByState {
                ID = 17,
                Name = "Glendale",
                StateID = 5
            },
            new CityByState {
                ID = 18,
                Name = "Moorpark",
                StateID = 5
            },
            new CityByState {
                ID = 19,
                Name = "Needles",
                StateID = 5
            },
            new CityByState {
                ID = 20,
                Name = "Ontario",
                StateID = 5
            }
        };
    }
}
