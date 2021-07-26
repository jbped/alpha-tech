const tabs = document.querySelector(".tabs");

function updateTab(event) {
    const tabList = tabs.children[0].children;
    for (let i = 0; i < tabList.length; i++){
        let tab = tabList[i];
        const currentTab = tab.children[0].innerText
        if (tab.className === "is-active"){
            tab.className = ""
            
        } 
    }
    event.target.parentElement.className = "is-active";

};

tabs.addEventListener("click", updateTab)