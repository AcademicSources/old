// _lcid="1033" _version="12.0.4518"
// _localBinding
// Version: "12.0.4518"
// Copyright (c) Microsoft Corporation.  All rights reserved.
var L_BrowserErrorSettingProperties_TEXT="There was an error in the browser while setting properties into the page HTML, possibly due to invalid URLs or other values.  Please try again or use different property values.";
function commonAttachEvent(objectToAttach, eventName, eventHandler)
{
	if(objectToAttach.attachEvent)
	{
		objectToAttach.attachEvent("on"+eventName,eventHandler);
	}
	else
	{
		objectToAttach.addEventListener(eventName,eventHandler, false);
	}
}
function commonGetAttribute(element, attributeName)
{
	var attributeValue="";
	if(element)
	{
		if((attributeName !="hspace") &&
			element.getAttribute)
		{
			attributeValue=element.getAttribute(attributeName, 2);
		}
		else if(element.getAttributeNode)
		{
			var attribNode=element.getAttributeNode(attributeName);
			if(attribNode && attribNode.specified)
			{
				attributeValue=attribNode.value;
			}
		}
	}
	return attributeValue;
}
function commonGetEventElement(e)
{
	if(!e)
	{
		e=window.event;
	}
	if(!e)
	{
		return null;
	}
	return (e.target) ? e.target : e.srcElement;
}
function AP_IsEmpty(value)
{
	if("undefined"==typeof(value) ||
	   null==value ||
	   ""==value)
	{
		return true;
	}
	else
	{
		return false;
	}
}
var CONST_ImageAssetPickerDialogName="AssetPortalBrowser.aspx";
var CONST_LinkAssetPickerDialogName="AssetPortalBrowser.aspx";
var CONST_EditHyperLinkDialogDialogName="AssetEditHyperLink.aspx";
var CONST_EditImageDialogDialogName="AssetImagePicker.aspx";
var CONST_ImageAssetPickerDialogFeatures="resizable: yes; status: no; scroll: no; help: no; dialogWidth:840px; dialogHeight:720px;";
var CONST_LinkAssetPickerDialogFeatures="resizable: yes; status: no; scroll: no; help: no; dialogWidth:840px; dialogHeight:720px;";
var CONST_EditHyperLinkDialogDialogFeatures="resizable: yes; status: no; scroll: no; help: no; dialogWidth:620px; dialogHeight:400px;";
var CONST_EditImageDialogDialogFeatures="resizable: yes; status: no; scroll: no; help: no; dialogWidth:745px; dialogHeight:640px;";
var CONST_AssetIconClassName="ms-asset-icon";
var CONST_AssetBoommarkOnlyClassName="ms-asset-internalBookmark";
var CONST_AssetBoommarkOnlyClassCssText="width: 20px; height: 20px; display: inline-block; background-color: transparent; background-image: url('../../../_layouts/images/rte2anchor.gif'); background-repeat: no-repeat; background-attachment: fixed; background-position: bottom right;";
function AP_EncodeQParam( ParamName, ParamValue )
{
	return ParamName+"="+encodeURIComponent(ParamValue );
}
function AP_GetCurrentQParamValue( ParamName )
{
	return AP_GetQParamValueFromString( ParamName, window.location.search );
}
function AP_GetQParamValueFromString( ParamName, QueryStringToSearch )
{
	var qParamRegExp=new RegExp( ParamName+"=([^&]*)", "i");
	var arrMatches=QueryStringToSearch.match(qParamRegExp);
	if( null==arrMatches )
	{
		return null;
	}
	else
	{
		return decodeURIComponent(arrMatches[1]);
	}
}
function AP_AppendQParamToUrl( ParamName, ParamValue, TargetUrl )
{
	if( /\?/.test(TargetUrl) )
	{
		return TargetUrl+"&"+AP_EncodeQParam( ParamName, ParamValue );
	}
	else
	{
		return TargetUrl+"?"+AP_EncodeQParam( ParamName, ParamValue );
	}
}
function AP_InsertQParamToUrl( ParamName, ParamValue, TargetUrl )
{
	if( null==AP_GetQParamValueFromString( ParamName, TargetUrl ) )
	{
		return AP_AppendQParamToUrl( ParamName, ParamValue, TargetUrl );
	}
	else
	{
		var qParamRegExp=new RegExp( ParamName+"=([^&]*)", "i");
		return TargetUrl.replace( qParamRegExp, AP_EncodeQParam( ParamName, ParamValue ) );
	}
}
function AP_AppendQParamToQString( ParamName, ParamValue, QString )
{
	if(QString && "" !=QString)
	{
		return QString+"&"+AP_EncodeQParam( ParamName, ParamValue );
	}
	else
	{
		return AP_EncodeQParam( ParamName, ParamValue );
	}
}
function AP_InsertQParamToQString( ParamName, ParamValue, QString )
{
	if( null==AP_GetQParamValueFromString( ParamName, QString ) )
	{
		return AP_AppendQParamToQString( ParamName, ParamValue, QString );
	}
	else
	{
		var qParamRegExp=new RegExp( ParamName+"=([^&]*)", "i");
		return QString.replace( qParamRegExp, AP_EncodeQParam( ParamName, ParamValue ) );
	}
}
function AP_GenerateSerializedObjectQString( objectToSerialize )
{
	var isFirstProp=true;
	var propType;
	var qStringSegmentToReturn="";
	for( prop in objectToSerialize )
	{
		propType=typeof(objectToSerialize[prop]);
		if( "string"==propType || "boolean"==propType || "number"==propType )
		{
			qStringSegmentToReturn=AP_InsertQParamToQString( prop, objectToSerialize[prop], qStringSegmentToReturn);
			if("true"==AP_GetCurrentQParamValue("DebugQString")) { alert("Adding: "+prop+"("+typeof(objectToSerialize[prop])+")=["+objectToSerialize[prop]+"]\n"+qStringSegmentToReturn); }
		}
	}
	return qStringSegmentToReturn;
}
function AP_PopulateFromSerializedObjectQString( objectToPopulate, queryStringSegment )
{
	var currentWorkingQString=queryStringSegment
	var indexOfQStringStart=queryStringSegment.indexOf("?");
	if( -1 !=indexOfQStringStart )
	{
		 currentWorkingQString=queryStringSegment.substr(indexOfQStringStart);
	}
	var propArray=currentWorkingQString.split("&");
	for( var i in propArray )
	{
		var nameValuePair=propArray[i].split("=");
		if(nameValuePair.length==2)
		{
			objectToPopulate[nameValuePair[0]]=decodeURIComponent(nameValuePair[1]);
		}
	}
}
function AP_CopyObjectValues( objectToCopyFrom, objectToCopyTo )
{
	var propType;
	for( prop in objectToCopyFrom )
	{
		propType=typeof(objectToCopyFrom[prop]);
		if( "string"==propType || "boolean"==propType || "number"==propType )
		{
			objectToCopyTo[prop]=objectToCopyFrom[prop];
		}
	}
}
function AP_QStringSerializeThisObject()
{
	return AP_GenerateSerializedObjectQString( this );
}
function AP_PopulateThisObjectFromQstring( serializedQueryString)
{
	return AP_PopulateFromSerializedObjectQString( this );
}
function AP_CopyValuesFromObjectToThisObject(objectToCopyFrom)
{
	return AP_CopyObjectValues( objectToCopyFrom, this );
}
function AP_HtmlElementMatchesTagName(HtmlElementObject, tagNameString)
{
	if( null==HtmlElementObject ||
		typeof(HtmlElementObject) !="object" ||
		"undefined"==HtmlElementObject.tagName )
	{
		return false;
	}
	return HtmlElementObject.tagName==tagNameString;
}
function AP_LaunchModalDialogOnElement(Config, HtmlElement, IsEditProperties, CopyValuesFromElement)
{
	if( CopyValuesFromElement )
	{
		if( !this.PopulateValuesFromElement(HtmlElement) )
		{
			return false;
		}
	}
	var newAssetData=null;
	var dialogReturnedData=false;
	var callbackThis=this;
	var cachedOuterReturnCallback=Config.ReturnCallback;
	Config.ReturnCallback=function(newAssetUrl, newAssetText, Config, newAssetData)
	{
		if( newAssetData )
		{
			if( newAssetData.AssetUrl || newAssetData.Name )
			{
				dialogReturnedData=true;
				var cacheManageText=callbackThis.ManageLinkDisplayText;
				callbackThis.CopyValuesFromObject( newAssetData );
				callbackThis.ManageLinkDisplayText=cacheManageText;
				try
				{
					callbackThis.SetValuesIntoElement(HtmlElement, Config);
				}
				catch(ex)
				{
					window.alert(L_BrowserErrorSettingProperties_TEXT);
					return;
				}
			}
		    if("function"==typeof(cachedOuterReturnCallback))
		    {
			    cachedOuterReturnCallback(newAssetData.AssetUrl, newAssetData.AssetText, Config, newAssetData);
		    }
		}
	}
	if( IsEditProperties )
	{
		return this.LaunchModalEditProperties(Config);
	}
	else
	{
		return this.LaunchModalAssetPicker(Config);
	}
}
var APD_AssetConfigGlobalObjectDictionary=new Object;
function APD_GetAssetPickerConfig(ClientID)
{
	return APD_AssetConfigGlobalObjectDictionary[ClientID];
}
function APD_LaunchAssetPickerUseConfigCurrentUrl(assetPickerConfigID)
{
	var assetPickerConfigObject=APD_GetAssetPickerConfig(assetPickerConfigID);
	if(!AP_IsEmpty(assetPickerConfigObject))
	{
		APD_LaunchAssetPicker(assetPickerConfigObject.GetCurrentAssetUrlValue(), assetPickerConfigID)
	}
	return null;
}
function APD_LaunchAssetPicker(currentAssetUrl, assetPickerConfigID)
{
	var assetPickerConfigObject=APD_GetAssetPickerConfig(assetPickerConfigID);
	if(!AP_IsEmpty(assetPickerConfigObject))
	{
		if(AP_IsEmpty(currentAssetUrl))
		{
			currentAssetUrl="";
		}
		var assetValueToLaunchFrom;
		if(true==assetPickerConfigObject.UseImageAssetPicker)
		{
			assetValueToLaunchFrom=new ImageAsset(currentAssetUrl);
		}
		else
		{
			assetValueToLaunchFrom=new LinkAsset(currentAssetUrl);
		}
		assetValueToLaunchFrom.LaunchModalAssetPicker(assetPickerConfigObject)
	}
	return null;
}
function AssetPickerConfig(ClientID)
{
	this.ClientID=ClientID;
	APD_AssetConfigGlobalObjectDictionary[ClientID]=this;
}
function AssetPickerConfig_GetDialogUrl( dialogName )
{
	var dialogUrl="/_layouts/"+dialogName;
	if(this.CurrentWebBaseUrl && this.CurrentWebBaseUrl !="")
	{
		dialogUrl=this.CurrentWebBaseUrl+dialogUrl;
	}
	return dialogUrl;
}
function AssetPickerConfig_GetDialogFeatures( defaultFeatures )
{
	var dialogFeatures=defaultFeatures;
	if(this.OverrideDialogFeatures && this.OverrideDialogFeatures !="")
	{
		dialogFeatures=this.OverrideDialogFeatures;
	}
	return dialogFeatures;
}
function AssetPickerConfig_GetCurrentAssetUrlValue()
{
	var currentAssetUrlValue="";
	if(!AP_IsEmpty(this.AssetUrlClientID))
	{
	   var assetUrlElement=document.getElementById(this.AssetUrlClientID)
	   if(!AP_IsEmpty(assetUrlElement))
	   {
			currentAssetUrlValue=assetUrlElement.value;
		}
	}
	return currentAssetUrlValue;
}
function AssetPickerConfig_LaunchUrlWithAsset(fullDialogUrl, assetValue, defaultFeatures)
{
	var definedDialogFeatures=defaultFeatures;
	if(this.OverrideDialogFeatures && this.OverrideDialogFeatures !="")
	{
		definedDialogFeatures=this.OverrideDialogFeatures;
	}
	g_APO_CachedCurrentConfigForDialog=this;
	commonShowModalDialog( fullDialogUrl, definedDialogFeatures, APO_InternalCallbackHandler, this);
	return null;
}
var g_APO_CachedCurrentConfigForDialog=null;
function APO_InternalCallbackHandler( newAssetFromDialog )
{
	if(!AP_IsEmpty(g_APO_CachedCurrentConfigForDialog) &&
	   "object"==typeof(newAssetFromDialog) &&
	   null !=newAssetFromDialog)
	{
		var newAsset=new LinkAsset();
		if(g_APO_CachedCurrentConfigForDialog.UseImagePicker)
		{
			newAsset=new ImageAsset();
		}
		newAsset.CopyValuesFromObject(newAssetFromDialog);
		if(!AP_IsEmpty(g_APO_CachedCurrentConfigForDialog.AssetUrlClientID) &&
		   !AP_IsEmpty(newAsset.AssetUrl))
		{
			var assetUrlElement=document.getElementById(g_APO_CachedCurrentConfigForDialog.AssetUrlClientID);
			if(!AP_IsEmpty(assetUrlElement))
			{
				assetUrlElement.value=newAsset.AssetUrl;
			}
		}
		if(!AP_IsEmpty(g_APO_CachedCurrentConfigForDialog.AssetTextClientID) &&
		   !AP_IsEmpty(newAsset.AssetText))
		{
			var assetTextElement=document.getElementById(g_APO_CachedCurrentConfigForDialog.AssetTextClientID);
			if(!AP_IsEmpty(assetTextElement))
			{
				assetTextElement.value=newAsset.AssetText;
			}
		}
		if("function"==typeof(g_APO_CachedCurrentConfigForDialog.ReturnCallback))
		{
			g_APO_CachedCurrentConfigForDialog.ReturnCallback(
				newAsset.AssetUrl,
				newAsset.AssetText,
				g_APO_CachedCurrentConfigForDialog,
				newAsset);
		}
	}
	g_APO_CachedCurrentConfigForDialog=null;
}
function AssetPickerConfig_GenerateQueryStringSegment()
{
	var serializerObject=new Object();
	serializerObject.DefaultAssetLocation=this.DefaultAssetLocation;
	serializerObject.DefaultAssetImageLocation=this.DefaultAssetImageLocation;
	serializerObject.DisplayLookInSection=this.DisplayLookInSection;
	serializerObject.DefaultToLastUsedLocation=this.DefaultToLastUsedLocation;
	serializerObject.ManageHyperlink=this.ManageHyperlink;
	serializerObject.DisplayWidth=this.DisplayWidth;
	serializerObject.DisplayHeight=this.DisplayHeight;
	serializerObject.AllowExternalUrls=this.AllowExternalUrls;
	serializerObject.OverrideDialogImageUrl=this.OverrideDialogImageUrl;
	serializerObject.OverrideDialogTitle=this.OverrideDialogTitle;
	return AP_GenerateSerializedObjectQString(serializerObject)
}
AssetPickerConfig.prototype.GenerateQueryStringSegment=AssetPickerConfig_GenerateQueryStringSegment;
AssetPickerConfig.prototype.GetDialogUrl=AssetPickerConfig_GetDialogUrl;
AssetPickerConfig.prototype.LaunchUrlWithAsset=AssetPickerConfig_LaunchUrlWithAsset;
AssetPickerConfig.prototype.GetCurrentAssetUrlValue=AssetPickerConfig_GetCurrentAssetUrlValue;
AssetPickerConfig.prototype.DefaultAssetLocation="";
AssetPickerConfig.prototype.DefaultAssetImageLocation="";
AssetPickerConfig.prototype.DisplayLookInSection=true;
AssetPickerConfig.prototype.DefaultToLastUsedLocation=true;
AssetPickerConfig.prototype.ManageHyperlink=true;
AssetPickerConfig.prototype.DisplayWidth="";
AssetPickerConfig.prototype.DisplayHeight="";
AssetPickerConfig.prototype.AllowExternalUrls=true;
AssetPickerConfig.prototype.OverrideDialogImageUrl="";
AssetPickerConfig.prototype.OverrideDialogTitle="";
AssetPickerConfig.prototype.CurrentWebBaseUrl="";
AssetPickerConfig.prototype.ReturnCallback=null;
AssetPickerConfig.prototype.OverrideDialogFeatures="";
AssetPickerConfig.prototype.OverrideDialogDesc="";
AssetPickerConfig.prototype.AssetUrlClientID="";
AssetPickerConfig.prototype.AssetTextClientID="";
AssetPickerConfig.prototype.UseImageAssetPicker=false;
function ImageAsset(AssetUrl)
{
	this.AssetUrl=AssetUrl;
}
function ImageAsset_LaunchModalAssetPicker(Config)
{
	var fullDialogUrl=		Config.GetDialogUrl(CONST_ImageAssetPickerDialogName)+"?APDView=Thumbs&"+		Config.GenerateQueryStringSegment()+"&Filter=1&"+		this.GenerateQueryStringSegment();
	return Config.LaunchUrlWithAsset( fullDialogUrl, this, CONST_ImageAssetPickerDialogFeatures)
}
function ImageAsset_LaunchModalEditProperties(Config)
{
	var fullDialogUrl=		Config.GetDialogUrl(CONST_EditImageDialogDialogName)+"?"+		Config.GenerateQueryStringSegment()+"&"+		this.GenerateQueryStringSegment();
	return Config.LaunchUrlWithAsset( fullDialogUrl, this, CONST_EditImageDialogDialogFeatures)
}
function ImageAsset_PopulateValuesFromElement(ImgHtmlElement)
{
	if( !AP_HtmlElementMatchesTagName(ImgHtmlElement, "IMG") )
	{
		return false;
	}
	this.AssetUrl=commonGetAttribute(ImgHtmlElement, "src");
	this.AssetText=commonGetAttribute(ImgHtmlElement, "alt");
	if( !this.AssetUrl || this.AssetUrl=="")
	{
		this.Height=0;
		this.Width=0;
	}
	else
	{
		var useExplicitHeight=false;
		if( ImgHtmlElement.style.height
			|| commonGetAttribute(ImgHtmlElement, "height") )
		{
			useExplicitHeight=true;
		}
		var useExplicitWidth=false;
		if( ImgHtmlElement.style.width
			|| commonGetAttribute(ImgHtmlElement, "width") )
		{
			useExplicitWidth=true;
		}
		this.Width=ImgHtmlElement.width;
		this.Height=ImgHtmlElement.height;
		this.UseDefaultSize=true;
		if( useExplicitWidth || useExplicitHeight )
		{
			this.UseDefaultSize=false;
			if( !useExplicitWidth )
			{
				this.Width="";
			}
			if(!useExplicitHeight)
			{
				this.Height="";
			}
		}
	}
	this.Border=0;
	if( ImgHtmlElement.style.borderWidth )
	{
		if( -1 !=ImgHtmlElement.style.borderWidth.toString().indexOf("px") )
		{
			this.Border=parseInt(ImgHtmlElement.style.borderWidth);
			if( this.Border.isNaN )
			{
				this.Border=0;
			}
		}
	}
	else if( commonGetAttribute(ImgHtmlElement, "border") )
	{
		this.Border=commonGetAttribute(ImgHtmlElement, "border");
	}
	this.HSpacing="";
	if( commonGetAttribute(ImgHtmlElement, "hspace") )
	{
		this.HSpacing=commonGetAttribute(ImgHtmlElement, "hspace");
	}
	this.VSpacing="";
	if( commonGetAttribute(ImgHtmlElement, "vspace") )
	{
		this.VSpacing=commonGetAttribute(ImgHtmlElement, "vspace");
	}
	this.Alignment="";
	if( commonGetAttribute(ImgHtmlElement, "align") )
	{
		this.Alignment=ImgHtmlElement.align;
	}
	if( AP_HtmlElementMatchesTagName(ImgHtmlElement.parentNode, "A") )
	{
		var parentLink=ImgHtmlElement.parentNode;
		if( commonGetAttribute(parentLink, "href") && "" !=commonGetAttribute(parentLink, "href") )
		{
			this.Hyperlink=commonGetAttribute(parentLink, "href");
		}
		this.Target=commonGetAttribute(parentLink, "target");
	}
	return true;
}
function ImageAsset_SetValuesIntoElement(ImgHtmlElement, Config)
{
	if( !AP_HtmlElementMatchesTagName(ImgHtmlElement, "IMG") )
	{
		return false;
	}
	var AnchorHtmlElement=ImgHtmlElement.parentNode;
	if( !AP_HtmlElementMatchesTagName(AnchorHtmlElement, "A") )
	{
		AnchorHtmlElement=null;
	}
	ImgHtmlElement.removeAttribute("src");
	ImgHtmlElement.removeAttribute("alt");
	ImgHtmlElement.removeAttribute("border");
	ImgHtmlElement.removeAttribute("hspace");
	ImgHtmlElement.removeAttribute("vspace");
	ImgHtmlElement.removeAttribute("align");
	ImgHtmlElement.style.width="";
	ImgHtmlElement.style.height="";
	ImgHtmlElement.style.border="";
	ImgHtmlElement.style.borderStyle="";
	ImgHtmlElement.style.borderBottomStyle="";
	ImgHtmlElement.style.borderLeftStyle="";
	ImgHtmlElement.style.borderRightStyle="";
	ImgHtmlElement.style.borderTopStyle="";
	ImgHtmlElement.style.borderWidth="";
	ImgHtmlElement.style.borderBottom="";
	ImgHtmlElement.style.borderBottomWidth="";
	ImgHtmlElement.style.borderLeft="";
	ImgHtmlElement.style.borderLeftWidth="";
	ImgHtmlElement.style.borderRight="";
	ImgHtmlElement.style.borderRightWidth="";
	ImgHtmlElement.style.borderTop="";
	ImgHtmlElement.style.borderTopWidth="";
	ImgHtmlElement.style.margin="";
	ImgHtmlElement.style.marginBottom="";
	ImgHtmlElement.style.marginLeft="";
	ImgHtmlElement.style.marginRight="";
	ImgHtmlElement.style.marginTop="";
	ImgHtmlElement.style.textAlign="";
	ImgHtmlElement.style.verticalAlign="";
	ImgHtmlElement.src=this.AssetUrl;
	if(Config && Config.ManageHyperlink && AnchorHtmlElement !=null)
	{
		if(this.Hyperlink && this.Hyperlink !="")
		{
			AnchorHtmlElement.href=this.Hyperlink;
			if(this.Target && this.Target !="")
			{
				AnchorHtmlElement.target=this.Target;
			}
			else
			{
				AnchorHtmlElement.removeAttribute("target");
			}
		}
		else
		{
			AnchorHtmlElement.removeAttribute("href");
		}
	}
	ImgHtmlElement.removeAttribute("width");
	ImgHtmlElement.removeAttribute("height");
	if(this.AssetText && this.AssetText !="")
	{
		ImgHtmlElement.alt=this.AssetText;
	}
	if(!this.UseDefaultSize && this.Width && this.Width !="")
	{
		ImgHtmlElement.style.width=this.Width+"px";
	}
	if(!this.UseDefaultSize && this.Height && this.Height !="")
	{
		ImgHtmlElement.style.height=this.Height+"px";
	}
	if(this.Border && this.Border !="")
	{
		ImgHtmlElement.border=this.Border;
		ImgHtmlElement.style.borderWidth=this.Border+"px";
		ImgHtmlElement.style.borderStyle="solid";
	}
	if(this.HSpacing && this.HSpacing !="")
	{
		ImgHtmlElement.hspace=this.HSpacing;
	}
	if(this.VSpacing && this.VSpacing !="")
	{
		ImgHtmlElement.vspace=this.VSpacing;
	}
	if(this.Alignment && this.Alignment !="")
	{
		ImgHtmlElement.align=this.Alignment;
	}
	return true;
}
function ImageAsset_GenerateSeralizedData()
{
	var serializerObject=new Object();
	serializerObject.USEDEFAULTSIZE=this.UseDefaultSize;
	serializerObject.SRC=this.AssetUrl;
	serializerObject.ALT=this.AssetText;
	serializerObject.ALIGN=this.Alignment;
	serializerObject.HSPACE=this.HSpacing;
	serializerObject.VSPACE=this.VSpacing;
	serializerObject.BORDER=this.Border;
	if(!this.UseDefaultSize && this.Height && this.Height !="" && this.Height !=0)
	{
		serializerObject.HEIGHT=this.Height;
	}
	if(!this.UseDefaultSize && this.Width && this.Width !="" && this.Width !=0)
	{
		serializerObject.WIDTH=this.Width;
	}
	if(this.Target && this.Target !="")
	{
		serializerObject.TARGET=this.Target;
	}
	if(this.Hyperlink && this.Hyperlink !="")
	{
		serializerObject.HREF=this.Hyperlink;
	}
	return AP_GenerateSerializedObjectQString(serializerObject)
}
function ImageAsset_ReadSerializedData(serializedData)
{
	var serializerObject=new Object();
	AP_PopulateFromSerializedObjectQString(serializerObject, serializedData)
	this.UseDefaultSize=serializerObject.USEDEFAULTSIZE;
	this.AssetUrl=serializerObject.SRC;
	this.AssetText=serializerObject.ALT;
	this.Alignment=serializerObject.ALIGN;
	this.HSpacing=serializerObject.HSPACE;
	this.VSpacing=serializerObject.VSPACE;
	this.Border=serializerObject.BORDER;
	this.Height=serializerObject.HEIGHT;
	this.Width=serializerObject.WIDTH;
	this.Hyperlink=serializerObject.HREF;
	this.Target=serializerObject.TARGET;
	return serializerObject;
}
ImageAsset.prototype.GenerateSeralizedData=ImageAsset_GenerateSeralizedData;
ImageAsset.prototype.ReadSerializedData=ImageAsset_ReadSerializedData;
ImageAsset.prototype.GenerateQueryStringSegment=AP_QStringSerializeThisObject;
ImageAsset.prototype.CopyValuesFromObject=AP_CopyValuesFromObjectToThisObject;
ImageAsset.prototype.LaunchModalAssetPicker=ImageAsset_LaunchModalAssetPicker;
ImageAsset.prototype.LaunchModalEditProperties=ImageAsset_LaunchModalEditProperties;
ImageAsset.prototype.LaunchModalDialogOnElement=AP_LaunchModalDialogOnElement;
ImageAsset.prototype.PopulateValuesFromElement=ImageAsset_PopulateValuesFromElement;
ImageAsset.prototype.SetValuesIntoElement=ImageAsset_SetValuesIntoElement;
ImageAsset.prototype.SetValuesIntoElement=ImageAsset_SetValuesIntoElement;
ImageAsset.prototype.AssetText="";
ImageAsset.prototype.Alignment="";
ImageAsset.prototype.Hyperlink="";
ImageAsset.prototype.HSpacing="";
ImageAsset.prototype.VSpacing="";
ImageAsset.prototype.Border=0;
ImageAsset.prototype.Height="";
ImageAsset.prototype.Width="";
ImageAsset.prototype.UseDefaultSize=true;
ImageAsset.prototype.ManageLinkDisplayText=true;
ImageAsset.prototype.Target="";
function LinkAsset(AssetUrl)
{
	this.AssetUrl=AssetUrl;
}
function LinkAsset_LaunchModalAssetPicker(Config)
{
	var fullDialogUrl=		Config.GetDialogUrl(CONST_LinkAssetPickerDialogName)+"?"+		Config.GenerateQueryStringSegment()+"&Filter=1&"+		this.GenerateQueryStringSegment();
	return Config.LaunchUrlWithAsset( fullDialogUrl, this, CONST_LinkAssetPickerDialogFeatures)
}
function LinkAsset_LaunchModalEditProperties(Config)
{
	var fullDialogUrl=		Config.GetDialogUrl(CONST_EditHyperLinkDialogDialogName)+"?"+		Config.GenerateQueryStringSegment()+"&"+		this.GenerateQueryStringSegment();
	return Config.LaunchUrlWithAsset( fullDialogUrl, this, CONST_EditHyperLinkDialogDialogFeatures)
}
function LinkAsset_PopulateValuesFromElement(AnchorHtmlElement)
{
	if( !AP_HtmlElementMatchesTagName(AnchorHtmlElement, "A") )
	{
		return false;
	}
	this.AssetUrl=commonGetAttribute(AnchorHtmlElement, "href");
	this.Name=commonGetAttribute(AnchorHtmlElement, "name");
	if(this.Name=="")
	{
		this.Name=commonGetAttribute(AnchorHtmlElement, "id");
	}
	if( this.ManageLinkDisplayText )
	{
		this.AssetText=AnchorHtmlElement.innerText;
	}
	this.Target=commonGetAttribute(AnchorHtmlElement, "target");
	this.TooltipText=commonGetAttribute(AnchorHtmlElement, "title");
	this.IconUrl="";
	var iconImageElement=this.FindAssetIconElement(AnchorHtmlElement);
	if( iconImageElement )
	{
		this.IconUrl=commonGetAttribute(iconImageElement, "src");
	}
	return true;
}
function LinkAsset_FindAssetIconElement(AnchorHtmlElement)
{
	var anchorChildren=AnchorHtmlElement.childNodes;
	var iconImageElement=null;
	if (anchorChildren !=null && anchorChildren.length > 0 &&
		anchorChildren[0].tagName=="IMG" &&
		anchorChildren[0].className==CONST_AssetIconClassName)
	{
		return anchorChildren[0];
	}
}
function LinkAsset_FixupIconsAndEmptyAnchors(AnchorHtmlElement)
{
	var iconImageElement=LinkAsset_FindAssetIconElement(AnchorHtmlElement);
	if( this.IconUrl )
	{
		if( iconImageElement )
		{
			iconImageElement.src=this.IconUrl
		}
		else
		{
			AnchorHtmlElement.innerHTML="<img class=\""+CONST_AssetIconClassName+"\" src=\""+this.IconUrl+"\" border=\"0\" />"+AnchorHtmlElement.innerHTML
		}
	}
	else
	{
		if( iconImageElement )
		{
			iconImageElement.parentNode.removeChild(iconImageElement);
		}
	}
	var hasHyperlink=!AP_IsEmpty(this.AssetUrl);
	var hasTooltip=!AP_IsEmpty(this.TooltipText);
	var hasName=!AP_IsEmpty(this.Name);
	var anchorIsEmpty=AP_IsEmpty(AnchorHtmlElement.innerHTML);
	if(hasName && !hasHyperlink && anchorIsEmpty)
	{
		AnchorHtmlElement.className=CONST_AssetBoommarkOnlyClassName;
		if(!hasTooltip && AP_IsEmpty(AnchorHtmlElement.title))
		{
			AnchorHtmlElement.title=this.Name;
		}
	}
	else if(!AP_IsEmpty(AnchorHtmlElement.className))
	{
		AnchorHtmlElement.className=AnchorHtmlElement.className.replace(CONST_AssetBoommarkOnlyClassName,"");
	}
	if(!hasTooltip &&
	   !anchorIsEmpty &&
	   this.Name==AnchorHtmlElement.title)
	{
		AnchorHtmlElement.title="";
	}
}
function LinkAsset_SetValuesIntoElement(AnchorHtmlElement, Config)
{
	if( !AP_HtmlElementMatchesTagName(AnchorHtmlElement, "A") )
	{
		return false;
	}
	var hasHyperlink=(this.AssetUrl && this.AssetUrl !="");
	var hasAssetText=(this.AssetText && this.AssetText !="");
	var hasName=(this.Name && this.Name !="");
	if(hasHyperlink)
	{
		AnchorHtmlElement.href=this.AssetUrl;
		AnchorHtmlElement.target=this.Target;
	}
	else
	{
		AnchorHtmlElement.removeAttribute("href");
		AnchorHtmlElement.removeAttribute("target");
	}
	AnchorHtmlElement.removeAttribute("name");
	AnchorHtmlElement.removeAttribute("id");
	if(hasName)
	{
		AnchorHtmlElement.name=this.Name;
		AnchorHtmlElement.id=this.Name;
	}
	if(!hasAssetText)
	{
		if(hasHyperlink)
		{
			this.AssetText=this.AssetUrl;
		}
		else
		{
			this.AssetText="";
		}
	}
	if( this.ManageLinkDisplayText ||
		!AnchorHtmlElement.innerText ||
		AnchorHtmlElement.innerText=="")
	{
		AnchorHtmlElement.innerText=this.AssetText;
	}
	AnchorHtmlElement.title=this.TooltipText;
	this.FixupIconsAndEmptyAnchors(AnchorHtmlElement)
	return true;
}
function LinkAsset_GenerateSeralizedData()
{
	var serializerObject=new Object();
	serializerObject.MANAGELINKDISPLAYTEXT=this.ManageLinkDisplayText;
	serializerObject.MANAGELINKICON=this.ManageLinkIcon;
	serializerObject.HREF=this.AssetUrl;
	serializerObject.NAME=this.Name;
	serializerObject.HTMLTAGTEXT=this.AssetText;
	serializerObject.TITLE=this.TooltipText;
	serializerObject.TARGET=this.Target;
	serializerObject.SRC=this.IconUrl;
	return AP_GenerateSerializedObjectQString(serializerObject)
}
function LinkAsset_ReadSerializedData(serializedData)
{
	var serializerObject=new Object();
	AP_PopulateFromSerializedObjectQString(serializerObject, serializedData)
	this.ManageLinkDisplayText=serializerObject.MANAGELINKDISPLAYTEXT;
	this.ManageLinkIcon=serializerObject.MANAGELINKICON;
	this.AssetUrl=serializerObject.HREF;
	this.Name=serializerObject.NAME;
	this.AssetText=serializerObject.HTMLTAGTEXT;
	this.TooltipText=serializerObject.TITLE;
	this.Target=serializerObject.TARGET;
	this.IconUrl=serializerObject.SRC;
}
LinkAsset.prototype.GenerateSeralizedData=LinkAsset_GenerateSeralizedData;
LinkAsset.prototype.ReadSerializedData=LinkAsset_ReadSerializedData;
LinkAsset.prototype.GenerateQueryStringSegment=AP_QStringSerializeThisObject;
LinkAsset.prototype.CopyValuesFromObject=AP_CopyValuesFromObjectToThisObject;
LinkAsset.prototype.LaunchModalAssetPicker=LinkAsset_LaunchModalAssetPicker;
LinkAsset.prototype.LaunchModalEditProperties=LinkAsset_LaunchModalEditProperties;
LinkAsset.prototype.LaunchModalDialogOnElement=AP_LaunchModalDialogOnElement;
LinkAsset.prototype.PopulateValuesFromElement=LinkAsset_PopulateValuesFromElement;
LinkAsset.prototype.SetValuesIntoElement=LinkAsset_SetValuesIntoElement;
LinkAsset.prototype.FixupIconsAndEmptyAnchors=LinkAsset_FixupIconsAndEmptyAnchors;
LinkAsset.prototype.FindAssetIconElement=LinkAsset_FindAssetIconElement;
LinkAsset.prototype.ManageLinkDisplayText=false;
LinkAsset.prototype.ManageLinkIcon=true;
LinkAsset.prototype.AssetText="";
LinkAsset.prototype.TooltipText="";
LinkAsset.prototype.Target="";
LinkAsset.prototype.IconUrl="";
LinkAsset.prototype.Name="";