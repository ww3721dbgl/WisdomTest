(function ($) {
   $.extend({
		
		//消息提示框
	　　luiMessage:function(options){
			var _this = this;
			if(!options || !options.type || options.type=="" || options.type>3){
				console.error("绿库前端研发部温馨提醒您：作为一名合格的研发人员，请传入正确的type值！");
				console.error("type=1 成功提示框");
				console.error("type=2 错误提示框");
				console.error("type=3 警告提示框");
				return;
			}
			
			var defaults = {
				type:1,
				text: '这是一个消息提示框！',
				hideTime:3000
			};
			
			var className = "";
			
			var opts = $.extend({}, defaults , options);
			switch (opts.type){
				case 1:
					className="lui-success-msg-tip"	
					break;
				case 2:
					className="lui-error-msg-tip"	
					break;
				case 3:
					className="lui-warning-msg-tip"	
					break;
				default:
					break;
			};
			
			$("body").append("<div class='lui-msg-tip "+className+"'>"+opts.text+""+(opts.showClose?'<i></i>':'')+"</div>");
			
			$(".lui-msg-tip").css({
				"position":"fixed",
				"width":"260px",
				"border":"1px solid red",
				"top":"-42px",
				"opacity":0,
				"left":"50%",
				"margin-left":"-190px",
				"height":"40px",
				"line-height":"40px",
				"padding":"0 40px 0 55px",
				"font-weight":"bold",
				"z-index":9999999999
			});
			//关闭按钮
			$(".lui-msg-tip i").css({
				"position":"absolute",
				"width":"16px",
				"height":"16px",
				"right":"15px",
				"cursor":"pointer",
				"top":"12px",
				"background": "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY4NTJBOEJBM0FGQzExRTlCQTQ0OThEOURBODdDNTQ0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY4NTJBOEJCM0FGQzExRTlCQTQ0OThEOURBODdDNTQ0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Njg1MkE4QjgzQUZDMTFFOUJBNDQ5OEQ5REE4N0M1NDQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Njg1MkE4QjkzQUZDMTFFOUJBNDQ5OEQ5REE4N0M1NDQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7i2OMvAAAApUlEQVR42mTQvQrCMBSG4VhyYUJBHJxEqU7+FFwFEcTFzUF076ijglapIHbrVBB6A96N74HTEmrgSSD5cvLTyPLia4yZ423+W4iBR7fEGa1aYIoD1hJ6YoILfA2MsUcbhdXJO2RDjAgzdPCRReuUv6GJFRbIywXPCfX1oltsnKOrSj2cdHzJPXCVlyGVUBdHDDUg7aGnSDCwWn6EpPYFsQZ3PwEGACENHweRyhTxAAAAAElFTkSuQmCC')",
				"background-repeat":"no-repeat",
				"background-position":"center center"
			});
			
			$(".lui-msg-tip.lui-success-msg-tip").css({"position":"fixed",
				"border":"1px solid",
				"border-color":options.boderColor || "#e1f4d7",
				"background":"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZBOTJDMjY3MzRGNjExRTk4NDkyQzVFNDVEMUU5OTYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZBOTJDMjY4MzRGNjExRTk4NDkyQzVFNDVEMUU5OTYzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkE5MkMyNjUzNEY2MTFFOTg0OTJDNUU0NUQxRTk5NjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkE5MkMyNjYzNEY2MTFFOTg0OTJDNUU0NUQxRTk5NjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7qOhcCAAACH0lEQVR42mJMP2TFgAWwAXEAFFsCsRQQ/wLiJ0B8HojXA/FGqBgKYMFiWCAQdwGxChZLNKA4EojvAHE5EK9DVsSExGYG4k6oAhUGwgCkZi1UDzM2F7YBcRkD6QCmpxzZhSGkGsbEyMzgK5/CIMIhBTM0BGYgKGz6STFMjFOWoUx/BoMsjxrDh5+vYcITQGaBDAwFYhliDdMXtmWoMpzH8PPvd4ZZ16oZ/vz/DZOSBuIwFmjSIAo4SYcxhCrlMjz7ep9hxvUqZMNgIABkoCmyCBcLLwMrExvDx19vUVR6ysYz+CukMXz78wVs2HcgjQWYgLwsAePxsQkzVBrMAXppPoMynx6GYSCw+HYbw+vvT3B5QpIJObV/Arrq8vvjDPxAg4v0JjPYSwaCMcywoy+2MJx/cxBvsIC8/ByIeWECq+9OBEYVO4ONhB9DpEoJw38gBIEPv14zrLk/mVAwPwe58BKyCMiApbe7GY6/3A7mMwIhCKy7Pw1XuCGDMyADN6CL/mf4Bw6rs6/3gfmPv95mOP1qNzEJYQPIy6uBuAM9Lf77/49h3s1GBmYmZoaTr3bCvY4HPAWZxQKNlCIgXoWu4u//Pwyzr9cBDf9LjOsKgfgnLC+DXNmNTRXIUCJc1w01A6X4qgTiKWSUNlOhelHLwxm2R/8CcS601LhDhEEgNaFAPTkgvTBBRjxVQCi09DaGZnxYwJ+FVgGrsVUBAAEGAOhnq3UQ0twhAAAAAElFTkSuQmCC') no-repeat 20px center",
				"color":options.tColor || "#67c13b",
				"background-color":options.bColor ||" #f0faec"
			});
			
			$(".lui-msg-tip.lui-error-msg-tip").css({"position":"fixed",
				"border":"1px solid",
				"border-color":options.boderColor || "#ffe3e2",
				"background":"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAxNTJGRDBGMzRGNzExRTlCNTQ1QTdBQ0IwQUFDMDJFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAxNTJGRDEwMzRGNzExRTlCNTQ1QTdBQ0IwQUFDMDJFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDE1MkZEMEQzNEY3MTFFOUI1NDVBN0FDQjBBQUMwMkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE1MkZEMEUzNEY3MTFFOUI1NDVBN0FDQjBBQUMwMkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7WhPtGAAABqElEQVR42pxVPU8CQRBd7sDYaO1HC8ZeJbGnBkw00c7C8gwdxNibKIUW+iuIymEJ/wCNiaVcqDR0dDYeH86D2cve3d6d+pKX7O3MPmZnZofUl2UJDRaIZeYucY34TfwgvhIfiTbv+ZDWiO0Rr4hZzY9sMo+IDrFGfFCdDGVtEi/ZISuSAZ97PmPqIrwgVsXfIc/U1Aj3VTEjmxxgwKfKGjNB5Obau3cuJxYrFZEpFCLFYIMPfBXcQMs8z+cPaXEsd6fDoRCjkciUSkK4rpj0+yEx2NxWS4y6XdW0THxPc2v44Lbb88MQxXenExKTPgGUIbijs/hEUykKfZokBmxDcCXK6okWi/PveDFg1dB1uw8UmXYdAUQ4IC5FVVNeU15ZzakGAwi+ETfixNRrJog+Q7ApmzJJzKs2F0qTzyZy2OAp4r2AuGpC1LXtWaECjf0JLTT2mAUPZGNPHCfYtD6g2eEz7vXU7ROkT75lRFmXloCjFgGfOmv4xtcZ8fYf0+aOz4bmIa5+ygVyfiHkcJosPhs5sTE0n9gZ03uLuK4k/oX/Ahq6R/EjwABKAKlgaxKVWQAAAABJRU5ErkJggg==') no-repeat 20px center",
				"color":options.tColor || "#f87c7c",
				"background-color":options.bColor ||" #fef0f0"
			});
			
			$(".lui-msg-tip.lui-warning-msg-tip").css({"position":"fixed",
				"border":"1px solid",
				"border-color":options.boderColor || "#fbecd9",
				"background":"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBDRTUwN0VBMzRGNzExRTk5NjhEQUY5NTdCOTU5MzFDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBDRTUwN0VCMzRGNzExRTk5NjhEQUY5NTdCOTU5MzFDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MENFNTA3RTgzNEY3MTFFOTk2OERBRjk1N0I5NTkzMUMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MENFNTA3RTkzNEY3MTFFOTk2OERBRjk1N0I5NTkzMUMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6dtfRAAAABaElEQVR42mJ8tsiGAQtgA+IAKLYEYikg/gXET4D4PBCvB+KNUDEUwILFsEAg7gJiFSyWaEBxJBDfAeJyIF6HrIgJic0MxJ1QBSoMhAFIzVqoHmZsLmwD4jIG0gFMTzmyC0NwGsbIzCDiMx+MQWw8hobADASFTT8ulUwc/AysgipgzMTOj8+lE0BmgQwMBWIZXKr+//mJYP/9ic9AaSAOY4ImDQbcBv7AysYBAkAGmuJV8v8vjIHExglMQLEsQUjV/99fiY1xSSZsqR3DwH9/wJgYADLwOUEDgWFHRPiBwHOQly8BsRo+VX8+3AMlSGIMPAMycAMsUeIC7/YRnYE2gLy8GlqK4ATcGqFgTAA8BZkFi5QifCrZJI3BmAAoBOKfjEjlIajIKmUgD3TDygLk4qsSiKeQYdhUqF6M8hCUDXKhEXSHCIPuQMuBHKhenCU2qNDcDFUMKr2NoRkfFvBnoVXAamyZAiDAAPwEW6AFlVWaAAAAAElFTkSuQmCC') no-repeat 20px center",
				"color":options.tColor || "#e6a23d",
				"background-color":options.bColor ||" #fdf6ec"
			});
			
			$(".lui-msg-tip").stop().animate({
				top:10,
				opacity:1
			},300,function(){
				$(".lui-msg-tip").delay(opts.hideTime).animate({
					top:"-42px",
					opacity:0
				},300)
			}); 
			
			$(document).on("click",".lui-msg-tip i",function(){
				$(this).parent().stop().animate({
					top:"-42px",
					opacity:0
				},300);
			});
			
		},
		
		//
		luiMessageBox:function(options){
			if(!options || !options.type || options.type=="" || options.type>2){
				console.error("绿库前端研发部温馨提醒您：作为一名合格的研发人员，请传入正确的type值！");
				console.error("type=1 确认删除提示框");
				console.error("type=2 确认提交提示框");
				return;
			}
			
			var defaults = {
				type:1,
				text: '这是一个消息提示框！',
				subText:'这是一个消息提示框',
				btnAlign:"right",
				callback:function(){}
			};
			
			var className = "";
			
			var opts = $.extend({}, defaults , options);
			
			switch (opts.type){
				case 1:
					className="lui-confirm-del-pop"	
					break;
				case 2:
					className="lui-confirm-submit-pop"	
					break;
				default:
					break;
			};
			if(opts.type==1 || opts.type==2){
				$("body").append(
								  "<div class='lui-page-lock'>"+
									"<div class='lui-confirm-pop "+className+"'>"+
										"<div class='lui-confirm-pop-content'>"+
											 "<p class='lui-confirm-pop-title'>"+opts.text+"</p>"+
											 "<p class='lui-confirm-pop-subTitle'>"+opts.subText+"</p>"+
										"</div>"+
										"<div class='lui-confirm-pop-footer'>"+
											"<button type='button' class='lui-confirm-pop-btn0'>取消</button>"+
											"<button type='button' class='lui-confirm-pop-btn1'>确定</button>"+
										"</div>"+
									"</div>"+
								  "</div>"
								 );
			}else{
				$("body").append("<div class='lui-page-lock "+className+"'></div>");
			}
			
			
			$(".lui-page-lock").css({
				"background-color":"rgba(0,0,0,.4)",
				"width":"100%",
				"height":"100%",
				"top":"0",
				"left":"0",
				"opacity":0,
				"z-index":9999999999
			});
			
			$(".lui-confirm-pop").css({
				"background-color":"#fff",
				"width":"520px",
				"height":"270px",
				"position":"absolute",
				"top":"50%",
				"left":"50%",
				"opacity":0,
				"margin-top":"-170px",
				"margin-left":"-260px",
				"border-radius":"5px"
			});
			
			$(".lui-confirm-del-pop .lui-confirm-pop-content").css({
				"background":"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAYAAACoYAD2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkY0MDY3QjIxRkM0MjExRTg4NzZFQjIyRjIxNEMzMjIwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkY0MDY3QjIyRkM0MjExRTg4NzZFQjIyRjIxNEMzMjIwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjQwNjdCMUZGQzQyMTFFODg3NkVCMjJGMjE0QzMyMjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjQwNjdCMjBGQzQyMTFFODg3NkVCMjJGMjE0QzMyMjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz46GmtjAAADcklEQVR42sSZW0iUQRTHPzfTSIKim0FFZBftYpGXrg9FaPQQFFkS1XsXCgyClDIwy4KgHgq6PRWF+qBkT8XSUyRW+pBmGLTdw+4PQZiY9j/y3xrXbXfmm9ntwI/9lp3vzH9n5jvnzHwpPbt3epY2GcwDWWA8GAF+gc8gBDrBB5sOUn3etxxsA8Vgrkb7LnAb1IJm084Chm1l2DvAfbBPU6DHdvt532Oww6Rv3YYFoAVcBfMtl8dCcI3+ClyIlN8rOAL5nlvLp9/yeDpi/ZgO6sFxi7Wr80ycAHXsz0hkGrgFNnvJsRL2l6YrMoVPYZGXXCviiAZ0RMoa2eSjk7fgIXgAXoABHz42gkPxRMpirjJw+oVOp4BpoBAsBTPBJFAG3hkKrYp8SFWRkiku8FPHJITkglOgO8rvknHOgkXgjoHIYTpUkVtBnqYjGZ0N4L0S+2QdvwJvQANHNTzasnxaDYTmUc8wkeUGTo6AT7xezXVYCqaDqRR1j6lT7AfYYzjtFXyI/4hcxtHQse98CsNTcxmMitJuJLgIJvK7/JFnBiIXgFWqyO0GN7dwZMKjOCtG2zFgvfK93XA0S9UqyCQmynQeY8hZodF+bEQMNo2dgyIzDaoZsWxwWLOtxMq7EcWFic0RfTLdOQnMIjUs7cRWgtk+fOQEWFEnws4oI54Brvj0kyUixyVA4FFwgNOdxmiQ7dPXhNR/hA8bq+A0e/TdEPGEm1q6iOxxKLBeESjh5yZYY+nzp0z3N0cCZYd4UMlkjQ4EDtYA4uy5I5ES5F/zegtY68hvSEQ+deTsiXJd7HAJdQZYZnU5cPZVuc50JFByfXc4LQYNs040W6eEsyWORAbV3H0d7LV0uJi4tFq1CmpW0pdf+8iznxCrclvrYE06pOitsXRaxhQrVDrK+wORIusMS/xEWptSWA8RKcF4Fz//pw3TEbmlfWQxVZcYhoTTFiIruX+PeThwEjT5cJ7BECSM9imwif3HPcHoZ1oLJnmag+y3X/fAqpf76sYkCWxkf726B1Zh6+Fpl+yx+xIkro/+S2KVjPEOUWXoq7k/cR2eWum3OtoUm4j0lI19IffntpmpnX4K6TeumRzsy7+9wW2p7LfPG5xISLtzvC+Xfvp1O/Z7zNzs/X3VIe9x5LB/hmyauPHqZf5+yTrT6j3ObwEGAMe5q8i9lKZTAAAAAElFTkSuQmCC') no-repeat 48px 50px"
			});
			
			$(".lui-confirm-submit-pop .lui-confirm-pop-content").css({
				"background":"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM5NDVBNkUyMzRGNzExRTlCRDhCQkMzOEJFNjcwQjlCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM5NDVBNkUzMzRGNzExRTlCRDhCQkMzOEJFNjcwQjlCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Mzk0NUE2RTAzNEY3MTFFOUJEOEJCQzM4QkU2NzBCOUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Mzk0NUE2RTEzNEY3MTFFOUJEOEJCQzM4QkU2NzBCOUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6th8ZoAAACoElEQVR42syZT0hUQRzHZ9fyIAgpWai0QdAf8JaCQXRoSekigdDFLEGLMAwvXroKdSuQ/hx0DXTTYxRBBxH3UISCdemSfy4VZWXkguJBWfH7hd+Tp7xk3pvZ3fnCR1h1Zj477+3sb+bFcpnLKkJKwDlwEdSDM+AoOCR/z4Lf4Av4CDJgGuTCDhQLKZgAd0EbqAk51k8wDh6Db7qN4pr/dxgMgQXQF0FOSRu2XZS+qmwJcrbmwU1QqsxzUPqaA9dMBCkzDMZAhbIf9vlCxigNK1gG3oBOlf90ylhluoJ8N69BsypcONaroJkMEnwGLqnCp0nG3lewHXQZDPILpMGHiO059vX/CfJjP2AgtwzOghvgvKx3UTLgX4L8gvdBpYHgW7Dkez1i8Ol+sFfwOOgwvIdOBHzrRE2HOO0I9lhYhC/IZa0DV8FTw8W8x/su5hf/d1Ct3Apvl2OcwcY8yG2Bl4Z90KnxAH4kLQhNSLXyF3wC73l1QKthv0kKNlgQvBVQQiUs9NvAS3zSQkfvQH8e7sPTFKy10FFCakbbqaZguXI35XHleCi46rDfKgV/OCy4FJeNkKuZo+Csw4KzFJxyWDBDwZk9dZxLxcJ0XI4jxhwUpFPOWwefgE2DzsalQPBnDQyGOebwZVOcdgrWrwYlOnNPJP35B26DzxH6GxWnXYdHVXIcUVHkS7vCIkE2Ybs2TfxFrwP3Xq8nF7QvTstZSbHyXBz2PVm4AyaLIMcxu3WOPjbAFSnjC5UJGXNDR5BZBy0y5YW4rC0yptIV9GbSOyvJ5kEsK8ckXUEzpyPohYeMp0DKcDH3L8IpWUrSOgWrTpZl58YN1kPZYoYN2zySN8u+/ug0ihk+huCe2nsMccS3yK+IgPcYghVTpMcQ2wIMAKKjhveYedyLAAAAAElFTkSuQmCC') no-repeat 48px 50px"
			});
			
			$(".lui-confirm-pop-content").css({
				"height":"170px"
			});
			
			$(".lui-confirm-pop-title").css({
				"font-size":"24px",
				"padding":"52px 0 12px 115px",
				"color":"#333"
			});
			
			$(".lui-confirm-pop-subTitle").css({
				"padding":"0 0 0 115px",
				"font-size":"16px",
				"color":"#666"
			});
			
			$(".lui-confirm-pop-footer").css({
				"height":"100px",
				"text-align":opts.btnAlign || "right"
			});
			
			$(".lui-confirm-pop-footer button").css({
				"margin-top":"33px",
				"height":"34px",
				"line-height":"34px",
				"min-width":"108px",
				"margin-right":"20px",
				"font-size":"16px",
				"border-radius":"4px",
				"cursor":"pointer"
			});
			
			$(".lui-confirm-pop-btn0").css({
				"background":"#fff",
				"border":"1px solid #cdcdcd"
			});
			
			$(".lui-confirm-pop-btn1").css({
				"background":"#4787fd",
				"border":"1px solid #4787fd",
				"color":"#fff"
			});
			
			$(".lui-confirm-pop-btn0").hover(function(){
				$(".lui-confirm-pop-btn0").css({
					"background":"#f8f7f5"
				});
			},function(){
				$(".lui-confirm-pop-btn0").css({
					"background":"#fff"
				});
			});
			
			$(".lui-confirm-pop-btn1").hover(function(){
				$(".lui-confirm-pop-btn1").css({
					"background":"#6ea0fb"
				});
			},function(){
				$(".lui-confirm-pop-btn1").css({
					"background":"#4787fd"
				});
			});
			
			$(".lui-page-lock").stop().animate({
				opacity:1
			},300);
			
			$(".lui-confirm-pop").stop().animate({
				opacity:1,
				marginTop:"-135px"
			},300);
			
			function closeConfirmPop(){
				$(".lui-page-lock").stop().animate({
					opacity:0
				},300);
				$(".lui-confirm-pop").stop().animate({
					opacity:0,
					marginTop:"-150px"
				},300);
			}
			
			$(".lui-confirm-pop-btn0").click(function(){
				opts.callback(0);
				closeConfirmPop();
			});
			
			
			$(".lui-confirm-pop-btn1").click(function(){
				closeConfirmPop();
				opts.callback(1);
			});
		}
		
	}); 
})(jQuery);