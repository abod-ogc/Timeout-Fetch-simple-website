const fetchDataBtn = document.querySelector(".fetchDataBtn");
const ms = document.querySelector(".msInput");
const resView = document.querySelector(".resView");

fetchDataBtn.addEventListener("click", () => {
    loadData();
});

async function loadData(){
    resView.textContent = "Loading..."
    fetchDataBtn.disabled = true;

    const data = await fetchData();
    if(data)
        resView.textContent = JSON.stringify(data, null, 2);
}

function timeout(ms)
{
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms);
    });
}

async function fetchData()
{
    const timeoutValue = Number(ms.value);
    try{
        const res = await Promise.race([fetch("https://jsonplaceholder.typicode.com/posts/1"), timeout(timeoutValue)]);

        if(!res.ok)
            throw new Error("Server responded with error.");

        return await res.json();
    }catch(error){
        resView.textContent = `❌ ${error.message}`;
        console.log(error);
        return null;
    }finally{
        fetchDataBtn.disabled = false;
    }
}