function TabClick(tabOn,tabOff1,tabOff2,tabOff3) {
    document.getElementById("DSM_Tab_" + tabOn).className = "DSM_TabOn";
   	document.getElementById("DSM_Tab_" + tabOn).blur();    
    document.getElementById("DSM_Tab_" + tabOff1).className = "DSM_TabOff"; 
    document.getElementById("DSM_Tab_" + tabOff2).className = "DSM_TabOff";
    document.getElementById("DSM_Tab_" + tabOff3).className = "DSM_TabOff";   
    
    document.getElementById("DSM_TabContent_" + tabOn).style.display = "block";
    document.getElementById("DSM_TabContent_" + tabOff1).style.display = "none"; 
    document.getElementById("DSM_TabContent_" + tabOff2).style.display = "none"; 
    document.getElementById("DSM_TabContent_" + tabOff3).style.display = "none";
    
    var SeverityComment = 'SeverityComment';
    var ProposedRevisionComment = 'ProposedRevisionComment';
    
    if(tabOn == 'Proposed')
    {
    	showWebPart(ProposedRevisionComment);
    	hideWebPart(SeverityComment );
    }
    else if(tabOn == 'Severity')
    {
    	showWebPart(SeverityComment );
    	hideWebPart(ProposedRevisionComment);
    }
    else
    {
    	hideWebPart(ProposedRevisionComment);
    	hideWebPart(SeverityComment );
    }
}

function hideWebPart(divid)
{
	var webparts = $("td[id^='MSOZoneCell_WebPartWPQ']:has(div#" + divid + ")"); //make an array of the titles of the web parts
  if(webparts.length)
  	webparts.hide();
}

function showWebPart(divid)
{
  var webparts = $("td[id^='MSOZoneCell_WebPartWPQ']:has(div#" + divid + ")"); //make an array of the titles of the web parts
  if(webparts.length)
  	webparts.show();
}

function alignRegistrationButton()
{
	var tdSubmit = $("td[id^='MSOZoneCell_WebPartWPQ'] div[id^='WebPartWPQ'] td td:has(input[id*='StepNextButton'])"); 
	if(tdSubmit.length)
	{
		$(tdSubmit).attr('align','right').attr('width','250');
	}
	
	var tdCancel = $("td[id^='MSOZoneCell_WebPartWPQ'] div[id^='WebPartWPQ'] td td:has(input[id*='CancelButton'])");
	if(tdCancel.length)
	{
		$(tdCancel).attr('align','left');
	}
	
	var spanUserNamefield = $("span[title^='User Name field is required.']");
	if(spanUserNamefield)	
		$(spanUserNamefield).text("User Name field is required.");

	var spanEmailfield = $("span[title^='Email field is required.']");
	if(spanEmailfield)	
		$(spanEmailfield).text("Email field is required.");
		
	var tdComplete = $("div#DSM_MainContent td[id^='MSOZoneCell_WebPartWPQ'] div[id^='WebPartWPQ'] div table tr td table tr td table tr td[align^='center']:contains('Complete')");
	if(tdComplete)	
		$(tdComplete).text("");
	
}

function scrollToComment()
{
	var scrollpos = $(document).height();
	$(document).scrollTop(scrollpos);
}