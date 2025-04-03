const checkBtn=document.querySelector("#check-btn");
const textInput = document.querySelector("#text-input");
const result = document.querySelector("#result");


checkBtn.addEventListener("click",()=>{
const inputValue = textInput.value.trim().toLowerCase(); 
if(!inputValue)
{
  alert("Please input a value");
}
 result.innerText=palindrome(inputValue);

}
)

function palindrome(str)
{
  let originalString=str;
str = str.toLowerCase().replace(/[^a-z0-9]/gi,"");
  let j=str.length-1;
  for(let i=0;i<str.length/2;i++)
  {
    if(str[i]!==str[j])
    {
      return`${originalString} is not a palindrome`;
    }
    j--;
  }
    return `${originalString} is a palindrome`;
}

