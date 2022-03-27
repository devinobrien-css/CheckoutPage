const sections = document.querySelectorAll('#observed');

function callbackFunction(entries) 
{
    clearTimeout(null);
    const [entry] = entries;
    if (entry.isIntersecting) 
    {
        entry.target.classList.remove("hidden");
        entry.target.classList.add("visible");
    } 
    else 
    {
        entry.target.classList.remove("visible");
        entry.target.classList.add("hidden");
    }
}

const options = 
{
    root: null,
    threshold: 0.10,
    rootMargin: "-40px",
}

const observer = new IntersectionObserver(callbackFunction, options);

sections.forEach(section => section.classList.add('hidden'));
sections.forEach(section => observer.observe(section));
