const welcome = document.getElementById("welcome");
const login_name = localStorage.getItem("name_stored");
const add_btn = document.getElementById("add_btn");
let id_stored = localStorage.getItem("id_count");
let id_count = id_stored ? JSON.parse(id_stored) : 0;
let color = ["#00FFFF", "#FFBF00", "#8B5CF6"];
let arr_stored = localStorage.getItem("card_arr");
let arr = arr_stored ? JSON.parse(arr_stored) : [];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const card = document.getElementById("card");

const new_sub = document.getElementById("new_subject");
const no_card = document.getElementById("no_card");
const card_present = document.getElementById("card_present");
const continue_btn = document.getElementById("continue_btn");
const name = document.getElementById("name");

render();

add_btn.addEventListener("click", () => {
  add_to_list();
});
new_sub.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    add_to_list();
  }
});

if (login_name != null) {
  welcome.classList.add("hidden");
  document.getElementById("main").classList.remove("hidden");
  document.getElementById("header_name").innerHTML = login_name;
}

name.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    save_name();
  }
});

continue_btn.addEventListener("click", () => {
  save_name();
});
function save_name() {
  const name = document.getElementById("name");
  localStorage.setItem("name_stored", name.value);
  if (localStorage.getItem("name_stored") != null) {
    welcome.classList.add("hidden");
    document.getElementById("main").classList.remove("hidden");
  }
  document.getElementById("header_name").textContent = name.value;
}

function add_to_list() {
  const new_subject = document.getElementById("new_subject");
  const errormsg = document.getElementById("error");
  sub_color = color[Math.floor(Math.random() * color.length)];
  let check = 0;
  for (i = 0; i < arr.length; i++) {
    if (new_subject.value.toLowerCase() === arr[i].name.toLowerCase()) {
      check = 1;
        errormsg.classList.remove("text-[#121212]");
        errormsg.classList.add("text-red-500");
      break;
    }
  }

  setTimeout(()=>{
    errormsg.classList.remove("text-red-500");
    errormsg.classList.add("text-[#121212]");
  },2000);
  


  if (check == 0) {
    let temp = {
      id: id_count,
      name: new_subject.value,
      attended: 0,
      total: 0,
      colour: sub_color,
      date: -1,
      month: -1,
    };
    id_count += 1;
    localStorage.setItem("id_count", JSON.stringify(id_count));
    arr.push(temp);
    localStorage.setItem("card_arr", JSON.stringify(arr));
    render();
    console.log(arr);
  }
}

function render() {
  if (arr.length !== 0) {
    no_card.classList.add("hidden");
    card_present.classList.remove("hidden");
  } else {
    no_card.classList.remove("hidden");
    card_present.classList.add("hidden");
  }
  let percentage = 0;

  {
    card.innerHTML = "";
    for (i = 0; i < arr.length; i++) {
      current_date = new Date();
      present_day = current_date.getDate();
      present_month = current_date.getMonth();

      let obj = arr[i];
      let disp_date = "";
      let disp_month = "";
      let display = "";

      if (obj.month == present_month && present_day == obj.date) {
        display = "Today";
      } else if (obj.month == present_month && present_day == obj.date + 1) {
        display = "Yesturday";
      } else if (obj.month == -1 && obj.date == -1) {
        display = "--";
      } else {
        disp_date = obj.date;
        disp_month = months[obj.month];
        display = disp_date + " " + disp_month;
      }

      if (obj.total == 0) {
        percentage = 0;
      } else {
        percentage = (obj.attended / obj.total) * 100;
      }

      card.innerHTML += `<div id ="" class="flex flex-col p-7 bg-[#1E1E1E] rounded-2xl">
              <div>
                <div class="flex items-center space-x-2  justify-between">
                  <p class="text-white text-2xl w-full truncate font-bold tracking-wide">
                    ${obj.name}
                  </p>
                  <div id = "d${i}">
                  <svg
    
                    class="w-5 h-5 cursor-pointer"
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <title>delete_2_line</title>
                    <g
                      id="页面-1"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        id="System"
                        transform="translate(-576.000000, -192.000000)"
                        fill-rule="nonzero"
                      >
                        <g
                          id="delete_2_line"
                          transform="translate(576.000000, 192.000000)"
                        >
                          <path
                            d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                            id="MingCute"
                            fill-rule="nonzero"
                          ></path>
                          <path
                            d="M14.2792,2 C15.1401,2 15.9044,2.55086 16.1766,3.36754 L16.7208,5 L20,5 C20.5523,5 21,5.44772 21,6 C21,6.55227 20.5523,6.99998 20,7 L19.9975,7.07125 L19.9975,7.07125 L19.1301,19.2137 C19.018,20.7837 17.7117,22 16.1378,22 L7.86224,22 C6.28832,22 4.982,20.7837 4.86986,19.2137 L4.00254,7.07125 C4.00083,7.04735 3.99998,7.02359 3.99996,7 C3.44769,6.99998 3,6.55227 3,6 C3,5.44772 3.44772,5 4,5 L7.27924,5 L7.82339,3.36754 C8.09562,2.55086 8.8599,2 9.72076,2 L14.2792,2 Z M17.9975,7 L6.00255,7 L6.86478,19.0712 C6.90216,19.5946 7.3376,20 7.86224,20 L16.1378,20 C16.6624,20 17.0978,19.5946 17.1352,19.0712 L17.9975,7 Z M10,10 C10.51285,10 10.9355092,10.386027 10.9932725,10.8833761 L11,11 L11,16 C11,16.5523 10.5523,17 10,17 C9.48715929,17 9.06449214,16.613973 9.00672766,16.1166239 L9,16 L9,11 C9,10.4477 9.44771,10 10,10 Z M14,10 C14.5523,10 15,10.4477 15,11 L15,16 C15,16.5523 14.5523,17 14,17 C13.4477,17 13,16.5523 13,16 L13,11 C13,10.4477 13.4477,10 14,10 Z M14.2792,4 L9.72076,4 L9.38743,5 L14.6126,5 L14.2792,4 Z"
                            id="形状"
                            fill="#4B5563"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  </div>
                </div>
                <div class="mt-2">
                  <p class="text-[${obj.colour}] font-semibold">${percentage.toFixed(0)}% Attendance</p>
                </div>
                <!-- percentage bar -->
                <div class="bg-black rounded w-full h-2 mt-5">
                  <div style = "width:${percentage.toFixed(0)}%" class="bg-[${obj.colour}]  h-2 rounded"></div>
                </div>
                <!-- attended total -->
                <div
                  class="flex justify-between items-center font-bold text-white mt-4"
                >
                  <p>
                    <span class="text-gray-400 font-normal">Attended: </span>${obj.attended}
                  </p>
                  <p>
                    <span class="text-gray-400 font-normal">Total: </span>${obj.total}
                  </p>
                </div>
                <!-- last entered edit -->
                <div
                  class="flex items-center justify-between mt-4 text-gray-400"
                >
                  <p>Last marked: ${display}</p>
                  <button id = "e${i}"
                    class="px-4 py-1 rounded bg-[#292929] text-[${obj.colour}] cursor-pointer hover:bg-black transition-all duration-200"
                  >
                    edit
                  </button>
                </div>
                <!-- absent and present button -->
                <div class="mt-6 flex w-full">
                  <button id="p${i}"
                    class="flex  w-full font-bold text-[#84CC15] items-center justify-center py-3 px-6 rounded-xl bg-[#232825] hover:bg-green-950 transition-all duration-200 cursor-pointer"
                  >
                    <svg
                      class="h-4 w-4 mr-2"
                      width="800px"
                      height="800px"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <style>
                          .cls-1 {
                            fill: #84cc15;
                          }
                        </style>
                      </defs>

                      <g id="check">
                        <path
                          class="cls-1"
                          d="M12.16,28a3,3,0,0,1-2.35-1.13L3.22,18.62a1,1,0,0,1,1.56-1.24l6.59,8.24A1,1,0,0,0,13,25.56L27.17,4.44a1,1,0,1,1,1.66,1.12L14.67,26.67A3,3,0,0,1,12.29,28Z"
                        />
                      </g>
                    </svg>
                    Present
                  </button>
                  <button id="a${i}"
                    class="flex w-full font-bold text-[#E56969] ml-3 items-center justify-center py-3 px-6 rounded-xl bg-[#282323] hover:bg-red-950 transition-all duration-200 cursor-pointer"
                  >
                    <svg class="h-4 w-4 mr-2"
                      width="800px"
                      height="800px"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <style>
                          .cls-2 {
                            fill:#E56969 ;
                          }
                        </style>
                      </defs>

                      <g id="cancel">
                        <path
                          class="cls-2"
                          d="M28,29a1,1,0,0,1-.71-.29l-24-24A1,1,0,0,1,4.71,3.29l24,24a1,1,0,0,1,0,1.42A1,1,0,0,1,28,29Z"
                        />

                        <path
                          class="cls-2"
                          d="M4,29a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l24-24a1,1,0,1,1,1.42,1.42l-24,24A1,1,0,0,1,4,29Z"
                        />
                      </g>
                    </svg>
                    Absent
                  </button>
                </div>
              </div>
            </div>`;
    }
    for (let i = 0; i < arr.length; i++) {
      let obj = arr[i];
      document.getElementById(`p${i}`).addEventListener("click", () => {
        const now = new Date();
        const date = now.getDate();
        const month = now.getMonth();
        obj.attended += 1;
        obj.total += 1;
        obj.date = date;
        obj.month = month;
        localStorage.setItem("card_arr", JSON.stringify(arr));
        render();
      });

      document.getElementById(`a${i}`).addEventListener("click", () => {
        const now = new Date();
        const date = now.getDate();
        const month = now.getMonth();
        obj.total += 1;
        obj.date = date;
        obj.month = month;

        localStorage.setItem("card_arr", JSON.stringify(arr));
        render();
      });

      document.getElementById(`d${i}`).addEventListener("click", () => {
        const del_popup = document.getElementById("popup");
        del_popup.classList.remove("opacity-0", "hidden");
        del_popup.classList.add("opacity-100");

        const delete_btn = document.getElementById("delete");
        const hello = document.getElementById("load");
        hello.onclick = () => {
          del_popup.classList.add("opacity-0", "hidden");
        };
        delete_btn.onclick = () => {
          arr.splice(i, 1);
          localStorage.setItem("card_arr", JSON.stringify(arr));
          del_popup.classList.add("opacity-0", "hidden");
          render();
        };
      });

      document.getElementById(`e${i}`).addEventListener("click", () => {
        const edit_popup = document.getElementById("edit_popup");
        const save_changes = document.getElementById("save_changes");
        const cancel_edit = document.getElementById("cancel_edit");
        const attended_inp = document.getElementById("attended_inp");
        const total_inp = document.getElementById("total_inp");
        edit_popup.classList.remove("hidden");
        attended_inp.value = obj.attended;
        total_inp.value = obj.total;
        save_changes.onclick = () => {
          let attended = Number(attended_inp.value);
          let total = Number(total_inp.value);
          console.log(attended);
          console.log(total);
          if(attended <=total){
          obj.attended = attended;
          obj.total = total;
          }
          else 
          {
             obj.attended = attended;
             obj.total = attended;
          }
          const now = new Date();
          const date = now.getDate();
          const month = now.getMonth();

          obj.date = date;
           obj.month = month;

          localStorage.setItem("card_arr", JSON.stringify(arr));
          edit_popup.classList.add("hidden");
          render();
        };
        cancel_edit.onclick = () => {
          edit_popup.classList.add("hidden");
        };
      });
    }
  }
}
