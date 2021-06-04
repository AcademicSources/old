// _lcid="1033" _version="12.0.4518"
// _localBinding
// Version: "12.0.4518"
// Copyright (c) Microsoft Corporation.  All rights reserved.
var ConstImageSelectorType="Image";
var ConstLinkSelectorType="Link";
var ConstSuffixEmptyPanelClientID="__EmptyPanel";
var ConstSuffixAssetSelectedPanelClientID="__AssetSelectedPanel";
var ConstSuffixDisplaySpanClientID="__DisplaySpan";
var ConstSuffixValContextID="__ValContext";
var ConstSuffixInsertAssetButton="____InsertAsset";
var ConstSuffixClearAssetButton="____ClearAsset";
var ASO_GlobalObjectDictionary=new Object;
function GetAssetSelector(ClientID)
{
	return ASO_GlobalObjectDictionary[ClientID];
}
function ASO_ClickEditAsset( objectSelectorID )
{
	return GetAssetSelector( objectSelectorID ).LaunchPicker(true);
}
function ASO_ClickInsertAsset( objectSelectorID )
{
	return GetAssetSelector( objectSelectorID ).LaunchPicker(true);
}
function ASO_ClickClearAsset( objectSelectorID )
{
	return GetAssetSelector( objectSelectorID ).ClearAssetData();
}
function ASO_InitializeSelectorControl()
{
	var displayElement=this.GetPrimaryHtmlDisplayElement();
	this.AssetData.PopulateValuesFromElement( displayElement );
	this.UpdateButtonsAndPanels();
}
function AssetSelector(Config, AssetData, SelectorType)
{
	this.Config=Config;
	this.AssetData=AssetData;
	this.SelectorType=SelectorType;
	this.AssetTextInputFieldClientID=this.Config.ClientID;
	this.EmptyPanelClientID=this.Config.ClientID+ConstSuffixEmptyPanelClientID;
	this.AssetSelectedPanelClientID=this.Config.ClientID+ConstSuffixAssetSelectedPanelClientID;
	this.DisplaySpanClientID=this.Config.ClientID+ConstSuffixDisplaySpanClientID;
	this.ValContextID=this.Config.ClientID+ConstSuffixValContextID;
	this.InsertAssetButton=new SelectorToolBarButton(this.Config.ClientID+ConstSuffixInsertAssetButton);
	this.ClearAssetButton=new SelectorToolBarButton(this.Config.ClientID+ConstSuffixClearAssetButton);
	if( ConstImageSelectorType !=SelectorType )
	{
		this.AssetData.ManageLinkDisplayText=true;
		this.AssetData.ManageLinkIcon=true;
	}
	this.UpdateRegisteredObject();
	return this;
}
function ASO_GetAssetTextInputField()
{
	return document.getElementById(this.AssetTextInputFieldClientID);
}
function ASO_GetEmptyPanel()
{
	return document.getElementById(this.EmptyPanelClientID);
}
function ASO_GetValContext()
{
	return document.getElementById(this.ValContextID);
}
function ASO_GetAssetSelectedPanel()
{
	return document.getElementById(this.AssetSelectedPanelClientID);
}
function ASO_GetFirstChildTagOfType( parentNode, tagNameToFind )
{
	if( parentNode )
	{
		for( i=0; i < parentNode.childNodes.length; i++)
		{
	        if (parentNode.childNodes[i].tagName==tagNameToFind)
	        {
				return parentNode.childNodes[i];
	        }
			var foundInChildTag=ASO_GetFirstChildTagOfType( parentNode.childNodes[i], tagNameToFind );
			if(null !=foundInChildTag)
			{
				return foundInChildTag;
			}
		}
	}
	return null;
}
function ASO_GetDisplaySpan()
{
	return document.getElementById(this.DisplaySpanClientID);
}
function ASO_GetImageTag()
{
	var returnValue=ASO_GetFirstChildTagOfType( this.GetAnchorTag(), "IMG" );
	if(null==returnValue)
	{
		returnValue=ASO_GetFirstChildTagOfType( this.GetDisplaySpan(), "IMG" )
	}
	return returnValue;
}
function ASO_GetAnchorTag()
{
	return ASO_GetFirstChildTagOfType( this.GetDisplaySpan(), "A" )
}
function ASO_GetPrimaryHtmlDisplayElement()
{
	if( ConstImageSelectorType==this.SelectorType )
	{
		return this.GetImageTag();
	}
	else
	{
		return this.GetAnchorTag();
	}
}
function ASO_UpdateRegisteredObject()
{
	ASO_GlobalObjectDictionary[this.Config.ClientID]=this;
}
function ASO_LaunchPicker(IsEditProperties)
{
	var htmlElementToPopulate=this.GetPrimaryHtmlDisplayElement();
	this.AssetData.ManageLinkDisplayText=true;
	var callbackThis=this;
	this.Config.ReturnCallback=function(newAssetUrl, newAssetText, currentConfig, newAssetData)
	{
		callbackThis.SetAssetDataIntoPostbackFields()
	}
	this.AssetData.LaunchModalDialogOnElement(this.Config, htmlElementToPopulate, IsEditProperties, IsEditProperties)
}
function ASO_SetAssetDataIntoPostbackFields()
{
	this.GetAssetTextInputField().value=this.AssetData.GenerateSeralizedData();
	this.UpdateButtonsAndPanels();
}
function ASO_UpdateButtonsAndPanels()
{
	if( this.AssetData.AssetUrl )
	{
		this.ClearAssetButton.EnableButton();
		this.GetAssetSelectedPanel().style.display="inline";
		this.GetEmptyPanel().style.display="none";
	}
	else
	{
		this.ClearAssetButton.DisableButton();
		this.GetAssetSelectedPanel().style.display="none";
		this.GetEmptyPanel().style.display="inline";
	}
}
function ASO_ClearAssetData()
{
	this.GetAssetTextInputField().value="";
	var htmlElement=this.GetPrimaryHtmlDisplayElement();
	if( ConstImageSelectorType==this.SelectorType )
	{
		this.AssetData=new ImageAsset("");
		this.AssetData.SetValuesIntoElement(htmlElement, this.Config);
		this.GetAnchorTag().removeAttribute("href",0);
		htmlElement.removeAttribute("src",0);
		htmlElement.removeAttribute("height",0);
		htmlElement.removeAttribute("width",0);
		htmlElement.style.height="";
		htmlElement.style.width="";
	}
	else
	{
		this.AssetData=new LinkAsset("");
		this.AssetData.SetValuesIntoElement(htmlElement, this.Config);
		htmlElement.removeAttribute("href",0);
		htmlElement.innerHTML="";
	}
	this.UpdateButtonsAndPanels()
}
AssetSelector.prototype.UpdateRegisteredObject=ASO_UpdateRegisteredObject;
AssetSelector.prototype.LaunchPicker=ASO_LaunchPicker;
AssetSelector.prototype.SetAssetDataIntoPostbackFields=ASO_SetAssetDataIntoPostbackFields;
AssetSelector.prototype.ClearAssetData=ASO_ClearAssetData;
AssetSelector.prototype.GetAssetTextInputField=ASO_GetAssetTextInputField;
AssetSelector.prototype.GetEmptyPanel=ASO_GetEmptyPanel;
AssetSelector.prototype.GetValContext=ASO_GetValContext;
AssetSelector.prototype.GetAssetSelectedPanel=ASO_GetAssetSelectedPanel;
AssetSelector.prototype.GetDisplaySpan=ASO_GetDisplaySpan;
AssetSelector.prototype.GetImageTag=ASO_GetImageTag;
AssetSelector.prototype.GetAnchorTag=ASO_GetAnchorTag;
AssetSelector.prototype.GetPrimaryHtmlDisplayElement=ASO_GetPrimaryHtmlDisplayElement;
AssetSelector.prototype.UpdateButtonsAndPanels=ASO_UpdateButtonsAndPanels;
AssetSelector.prototype.InitializeSelectorControl=ASO_InitializeSelectorControl;
function SelectorToolBarButton(ToolbarButtonID)
{
	this.ClientID=ToolbarButtonID;
	this.buttonAnchorElement=document.getElementById(this.ClientID);
	this.buttonAnchorLinkElement=document.getElementById(this.ClientID+"_LINK");
	this.CachedOnClickHandler=document.getElementById(this.ClientID).onclick;
	this.CachedHref=document.getElementById(this.ClientID).href;
	if(this.buttonAnchorElement)
	{
		var arrImages=this.buttonAnchorElement.getElementsByTagName("IMG");
		if( arrImages && arrImages.length > 0) this.buttonImage=arrImages[0];
	}
	return this;
}
var disabledButtonStyle=" ms-selectorlinkdis";
function ASTB_EnableButton()
{
	if( typeof(this.CachedOnClickHandler)=="function" )
	{
		this.buttonAnchorElement.onclick=this.CachedOnClickHandler;
		this.buttonAnchorLinkElement.onclick=this.CachedOnClickHandler;
		this.buttonAnchorElement.href=this.CachedHref;
		this.buttonAnchorLinkElement.href=this.CachedHref;
	}
	var parentCssClass=this.buttonAnchorElement.parentNode.className;
	var myRegex=new RegExp(disabledButtonStyle, "ig");
	parentCssClass=parentCssClass.replace(myRegex, "");
	this.buttonAnchorElement.parentNode.className=parentCssClass;
}
function ASTB_DisableButton()
{
	this.buttonAnchorElement.onclick=ASTB_EmptyOnClick;
	this.buttonAnchorLinkElement.onclick=ASTB_EmptyOnClick;
	this.buttonAnchorElement.removeAttribute("href",0);
	this.buttonAnchorLinkElement.removeAttribute("href",0);
	this.buttonAnchorElement.parentNode.className=		this.buttonAnchorElement.parentNode.className+disabledButtonStyle;
}
function ASTB_EmptyOnClick()
{
	return false;
}
SelectorToolBarButton.prototype.EnableButton=ASTB_EnableButton;
SelectorToolBarButton.prototype.DisableButton=ASTB_DisableButton;
function traverseElementTree(element, callbackFunction, data)
{
	var retValue=callbackFunction(element, data);
	if(retValue !=null)
	{
		return  retValue;
	}
	var objChildren=element.childNodes;
	for(var i=0; i < objChildren.length; i++)
	{
		retValue=traverseElementTree(objChildren.item(i), callbackFunction, data);
		if(retValue !=null)
		{
			return  retValue;
		}
	}
	return null;
}
function getElementById(startElement, id)
{
	var checkIdFunction=function(element, id){return element.id==id ? element : null;};
	return  traverseElementTree(startElement, checkIdFunction, id);
}
function LayoutInfo(name, description, previewImageUrl)
{
	this.name=name;
	this.description=description;
	this.previewImageUrl=previewImageUrl;
}
function setSrcAttribute(imageElement, value)
{
	imageElement.src=value;
}
function setInnerText(element, value)
{
	element.innerText=value;
}
function setInnerHTML(element, value)
{
	element.innerHTML=value;
}
var GlobalLayoutSelectionControlDictionary=new Object();
function LayoutSelectionControl(layoutInfos, onNameChanged, onDescriptionChanged, onPreviewImageUrlChanged, containerId,
	nameElementId, descriptionElementId, previewImageElementId, dropDownListId)
{
	this.layoutInfos=layoutInfos;
	this.onNameChanged=onNameChanged;
	this.onDescriptionChanged=onDescriptionChanged;
	this.onPreviewImageUrlChanged=onPreviewImageUrlChanged;
	this.containerId=containerId;
	this.dropDownListId=dropDownListId;
	this.nameElementId=nameElementId;
	this.descriptionElementId=descriptionElementId;
	this.previewImageElementId=previewImageElementId;
	this.OnSelectionChanged=LayoutSelectionControl_OnSelectionChanged;
	this.Update=LayoutSelectionControl_Update;
	this.OnInit=LayoutSelectionControl_OnInit;
	this.DropDownList=LayoutSelectionControl_DropDownList;
	GlobalLayoutSelectionControlDictionary[containerId]=this;
}
function LayoutSelectionControl_DropDownList()
{
	var container=document.getElementById(this.containerId);
	var control=getElementById(container, this.dropDownListId);
	return control;
}
function LayoutSelectionControl_OnSelectionChanged(selectElement)
{
	var layoutInfo=this.layoutInfos[selectElement.selectedIndex];
	this.Update(layoutInfo);
}
function LayoutSelectionControl_OnInit(selectIndex)
{
	var layoutInfo=this.layoutInfos[selectIndex];
	this.Update(layoutInfo);
}
function LayoutSelectionControl_Update(layoutInfo)
{
	var container=document.getElementById(this.containerId);
	var descriptionTarget=getElementById(container,this.descriptionElementId);
	var previewImageTarget=getElementById(container, this.previewImageElementId);
	var nameTarget=getElementById(container, this.nameElementId);
	if(this.onNameChanged !=null && nameTarget !=null)
	{
		this.onNameChanged(nameTarget, layoutInfo.name);
	}
	if(this.onDescriptionChanged !=null && descriptionTarget !=null)
	{
		this.onDescriptionChanged(descriptionTarget, layoutInfo.description);
	}
	if(this.onPreviewImageUrlChanged !=null && previewImageTarget !=null)
	{
		this.onPreviewImageUrlChanged(previewImageTarget, layoutInfo.previewImageUrl);
	}
}
function SetDisableAttribute(obj, disabledStatus)
{
	try
	{
		if(disabledStatus && obj.setAttribute)
		{
			obj.setAttribute('disabled', true);
		}
		else if (!disabledStatus && obj.removeAttribute)
		{
			obj.removeAttribute('disabled');
		}
	} catch(e) { }
}
function SetDisableAttributeDeep(obj, disabledStatus)
{
	traverseElementTree(obj, SetDisableAttribute, disabledStatus);
}
function SetDisplayStyle(element, value)
{
	if(element.style !=null)
	{
		element.style.display=value;
	}
}
function SetDisplayStyleDeep(obj, value)
{
	traverseElementTree(obj, SetDisplayStyle, value);
}
var RadioButtonInfo_Options_none=0;
var RadioButtonInfo_Options_disable_when_not_selected=1;
var RadioButtonInfo_Options_hide_when_not_selected=2;
function RadioButtonInfo(radioButtonId, associatedPanelId, options)
{
	this.radioButtonId=radioButtonId;
	this.associatedPanelId=associatedPanelId;
	this.options=options;
}
function RadioGroupWithAssociatedPanels( radioButtonInfos)
{
	this.radioButtonInfos=radioButtonInfos;
	this.oldSelectedIndex=-1;
	this.OnClicked=RadioGroupWithAssociatedPanels_OnClicked;
	this.UpdatePanel=RadioGroupWithAssociatedPanels_UpdatePanel;
	this.OnInit=RadioGroupWithAssociatedPanels_OnInit;
	this.AddButtonInfo=RadioGroupWithAssociatedPanels_AddButtonInfo
}
function RadioGroupWithAssociatedPanels_AddButtonInfo(radioButtonInfo)
{
	this.radioButtonInfos[this.radioButtonInfos.length]=radioButtonInfo;
}
function RadioGroupWithAssociatedPanels_UpdatePanel(index)
{
	if(index >=0)
	{
		var buttonInfo=this.radioButtonInfos[index];
		var button=document.getElementById(buttonInfo.radioButtonId);
		var panel=document.getElementById(buttonInfo.associatedPanelId);
		if(panel !=null)
		{
			if((buttonInfo.options & RadioButtonInfo_Options_disable_when_not_selected) !=0)
			{
				SetDisableAttributeDeep(panel, !button.checked);
			}
			if((buttonInfo.options & RadioButtonInfo_Options_hide_when_not_selected) !=0)
			{
				var value=button.checked ? '' : 'none';
				SetDisplayStyle(panel, value);
			}
			var onUpdatePanelHandler=button.parentNode.getAttribute("onupdatepanel");
			if (onUpdatePanelHandler !=null && onUpdatePanelHandler !="")
			{
				eval(onUpdatePanelHandler+"()");
			}
		}
	}
}
function RadioGroupWithAssociatedPanels_OnInit()
{
	for(var i=0;  i < this.radioButtonInfos.length; i++)
	{
		var info=this.radioButtonInfos[i];
		var button=document.getElementById(info.radioButtonId);
		if(button.checked)
		{
			this.oldSelectedIndex=i;
		}
		this.UpdatePanel(i);
	}
}
function RadioGroupWithAssociatedPanels_OnClicked()
{
	for(var newSelectedIndex=0;  newSelectedIndex < this.radioButtonInfos.length; newSelectedIndex++)
	{
		var info=this.radioButtonInfos[newSelectedIndex];
		var button=document.getElementById(info.radioButtonId);
		if(button.checked)
		{
			break;
		}
	}
	if(newSelectedIndex !=this.oldSelectedIndex)
	{
		this.UpdatePanel(this.oldSelectedIndex);
		this.UpdatePanel(newSelectedIndex);
		this.oldSelectedIndex=newSelectedIndex;
	}
}