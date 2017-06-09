$(document).ready(function(){
	modal = document.getElementById('id01');
	genTable()
	updateTable()
	var cookie = getCookieDict();
	cookie.regisCourse = JSON.parse(cookie.regisCourse)
	cookie.regisHybrid = JSON.parse(cookie.regisHybrid)
	cookie.name = JSON.parse(cookie.name)
	cookie.nameE = JSON.parse(cookie.nameE)
	cookie.tel = JSON.parse(cookie.tel)
	$('#name').html(decodeURIComponent(cookie.name['nname'])+' '+decodeURIComponent(cookie.name['name'])+' '+decodeURIComponent(cookie.name['sname']))
	$('#nameE').html(decodeURIComponent(cookie.nameE['nname'])+' '+decodeURIComponent(cookie.nameE['name'])+' '+decodeURIComponent(cookie.nameE['sname']))
	$('#parentTel').html(cookie.tel.parent+'(ผู้ปกครอง)')
	$('#studentTel').html(cookie.tel.student+'(นักเรียน)')
	$('#email').html(cookie.email)
	$('#crFee').html(cookie.courseFee.slice(0,cookie.courseFee.length-3)+',000' +' บาท')
	$('#grade').html(gradetoText(cookie.grade))
	console.log(cookie)
	var crPrint = ''
	for(i in cookie.regisCourse){
		if(cookie.regisCourse[i]!=false){
			cookie.regisCourse[i].day = new Date(cookie.regisCourse[i].day)
			if (cookie.regisCourse[i].tutor[0]==99000){
                cookie.regisCourse[i].courseName+='(HB)'
            }
			if(cookie.regisCourse[i].select){
				crPrint += numtoDay(cookie.regisCourse[i].day.getDay())+' '+cookie.regisCourse[i].day.getHours()+'.00 น. : '+cookie.regisCourse[i].courseName+'<br>'
			}
			if(cookie.regisCourse[i].day.getDay()==6 && cookie.regisCourse[i].select==true){
				var time = cookie.regisCourse[i].day.getHours()
				for(j=0;j<4;j++){
					var temp = (10*time)+(j*5)
					$( "#skilltime option[value="+temp+"],#skilltimeEng option[value="+temp+"]" ).wrap( "<span>" );
				}
			}
		}
	}
	$('#cr').html(crPrint)
	var hbPrint = ''
	for(i in cookie.regisHybrid){
		if(cookie.regisHybrid[i]!=false){
			cookie.regisHybrid[i].day = new Date(cookie.regisHybrid[i].day)
			hbPrint += numtoDay(cookie.regisHybrid[i].day.getDay())+' '+cookie.regisHybrid[i].day.getHours()+'.00-'+(cookie.regisHybrid[i].day.getHours()+2)+'.00 น. : '+fullHBname(cookie.regisHybrid[i].subject)+'<br>'
			if(cookie.regisHybrid[i].day.getDay()==6){
				var time = cookie.regisHybrid[i].day.getHours()
				for(j=0;j<4;j++){
					var temp = (10*time)+(j*5)
					$( "#skilltime option[value="+temp+"],#skilltimeEng option[value="+temp+"]" ).wrap( "<span>" );
				}
			}
		}
	}
	$('#hb').html(hbPrint)
	$('#skillSel').change(function(){
		console.log($('#skillSel').val())
		switch(parseInt($('#skillSel').val())){
			case 1:
				$('#math,#eng').show()
				break;
			case 2:
				$('#math').show()
				$('#eng').hide()
				$('#skilltimeEng').val('0')
				break;
			case 3:
				$('#math').hide()
				$('#eng').show()
				$('#skilltime').val('0')
				break;
			case 4:
				$('#math,#eng').hide()
				$('#skilltimeEng').val('0')
				$('#skilltime').val('0')
				break;
		}
	})
	$('#skillday').change(function(){
		var time = ['90','95','100','105','110','130','135','140','145','150']
		for(i=0;i<time.length;i++){
			if ( $( "#skilltime option[value="+time[i]+"]" ).parent().is( "span" ) ){
				$( "#skilltime option[value="+time[i]+"]" ).unwrap();
			}
		}
		var cookie = getCookieDict();
		cookie.regisCourse = JSON.parse(cookie.regisCourse)
		cookie.regisHybrid = JSON.parse(cookie.regisHybrid)
		for(i in cookie.regisCourse){
			if(cookie.regisCourse[i]!=false){
				cookie.regisCourse[i].day = new Date(cookie.regisCourse[i].day)
				if(cookie.regisCourse[i].day.getDay()==daytoNum($('#skillday').val()) && cookie.regisCourse[i].select==true){
					var time = cookie.regisCourse[i].day.getHours()
					for(j=0;j<4;j++){
						var temp = (10*time)+(j*5)
						$( "#skilltime option[value="+temp+"]").wrap( "<span>" );
					}
				}
			}
		}
		for(i in cookie.regisHybrid){
			if(cookie.regisHybrid[i]!=false){
				cookie.regisHybrid[i].day = new Date(cookie.regisHybrid[i].day)
				if(cookie.regisHybrid[i].day.getDay()==daytoNum($('#skillday').val())){
					var time = cookie.regisHybrid[i].day.getHours()
					for(j=0;j<4;j++){
						var temp = (10*time)+(j*5)
						$( "#skilltime option[value="+temp+"]" ).wrap( "<span>" );
					}
				}
			}
		}
	})
	
	$('#skilldayEng').change(function(){
		var time = ['90','95','100','105','110','130','135','140','145','150']
		for(i=0;i<time.length;i++){
			if ( $( "#skilltimeEng option[value="+time[i]+"]" ).parent().is( "span" ) ){
				$( "#skilltimeEng option[value="+time[i]+"]" ).unwrap();
			}
		}
		var cookie = getCookieDict();
		cookie.regisCourse = JSON.parse(cookie.regisCourse)
		cookie.regisHybrid = JSON.parse(cookie.regisHybrid)
		for(i in cookie.regisCourse){
			if(cookie.regisCourse[i]!=false){
				cookie.regisCourse[i].day = new Date(cookie.regisCourse[i].day)
				if(cookie.regisCourse[i].day.getDay()==daytoNum($('#skilldayEng').val()) && cookie.regisCourse[i].select==true){
					var time = cookie.regisCourse[i].day.getHours()
					for(j=0;j<4;j++){
						var temp = (10*time)+(j*5)
						$( "#skilltimeEng option[value="+temp+"]").wrap( "<span>" );
					}
				}
			}
		}
		for(i in cookie.regisHybrid){
			if(cookie.regisHybrid[i]!=false){
				cookie.regisHybrid[i].day = new Date(cookie.regisHybrid[i].day)
				if(cookie.regisHybrid[i].day.getDay()==daytoNum($('#skilldayEng').val())){
					var time = cookie.regisHybrid[i].day.getHours()
					for(j=0;j<4;j++){
						var temp = (10*time)+(j*5)
						$( "#skilltimeEng option[value="+temp+"]" ).wrap( "<span>" );
					}
				}
			}
		}
	})
	
	$("#station").change(function(){
		if ($(this).val() == "2"){
			$('#skilltime').val('0')
			document.getElementById('skillday').disabled = true
			document.getElementById('skillday').style = "visibility:hidden"
			document.getElementById('skilltime').disabled = true
			document.getElementById('skilltime').style = "visibility:hidden"
			document.getElementById('skilltime').value = "0"

		}
		else{
			document.getElementById('skillday').disabled = false
			document.getElementById('skillday').style = ""
			document.getElementById('skilltime').disabled = false
			document.getElementById('skilltime').style = ""
		}
	})
	$("#stationEng").change(function(){
		if ($(this).val() == "2"){
			$('#skilltime').val('0')
			document.getElementById('skilldayEng').disabled = true
			document.getElementById('skilldayEng').style = "visibility:hidden"
			document.getElementById('skilltimeEng').disabled = true
			document.getElementById('skilltimeEng').style = "visibility:hidden"
			document.getElementById('skilltimeEng').value = "0"

		}
		else{
			document.getElementById('skilldayEng').disabled = false
			document.getElementById('skilldayEng').style = ""
			document.getElementById('skilltimeEng').disabled = false
			document.getElementById('skilltimeEng').style = ""
		}
	})

	$('#skilltime,#skilltimeEng,#skillday,#skilldayEng').change(function(){
		if($('#skillday').val() == $('#skilldayEng').val() && ($('#skilltime').val() == $('#skilltimeEng').val() || parseInt($('#skilltime').val())+5 == parseInt($('#skilltimeEng').val()) || parseInt($('#skilltime').val()) == parseInt($('#skilltimeEng').val())+5)){
			if($('#skilltime').val()!='0'){
				alert('คุณไม่สามารถเลือกเวลาเรียนทับกันได้')
				$('#skilltimeEng').val('0')
				$('#skilltime').val('0')
			}
		}
	})
})

function genTable(){
	var temp = document.getElementsByClassName('disabled')
	var i
	for(i=0;i<temp.length;i++){
		var j
		var name = ''
		for(j=0;j<6;j++){
			name += temp[i].className.split(' ')[j]+' ';
		}
		temp[i].className = name
		temp[i].innerHTML = '-'
	}
}

function updateTable(){
	var cookie = getCookieDict();
	cookie.regisCourse = JSON.parse(cookie.regisCourse)
	cookie.regisHybrid = JSON.parse(cookie.regisHybrid)
	for(i in cookie.regisCourse){
		if(cookie.regisCourse[i]!=false){
			cookie.regisCourse[i].day = new Date(cookie.regisCourse[i].day)
			if (cookie.regisCourse[i].tutor[0]==99000){
                cookie.regisCourse[i].courseName+='(HB)'
            }
			if(cookie.regisCourse[i].day.getDay()==6 && cookie.regisCourse[i].select==true){
				var j
				var courseClass = document.getElementsByClassName('btn-sat '+cookie.regisCourse[i].day.getHours()+'.1')
				for(j=0;j<courseClass.length;j++){
					courseClass[j].className = courseClass[j].className+' cr';
					courseClass[j].innerHTML = 'CR : '+cookie.regisCourse[i].courseName;
				}
			}
			if(cookie.regisCourse[i].day.getDay()==0 && cookie.regisCourse[i].select==true){
				var j
				var courseClass = document.getElementsByClassName('btn-sun '+cookie.regisCourse[i].day.getHours()+'.1')
				for(j=0;j<courseClass.length;j++){
					courseClass[j].className = courseClass[j].className+' cr';
					courseClass[j].innerHTML = 'CR : '+cookie.regisCourse[i].courseName;
				}
			}
		}
	}
	for(i in cookie.regisHybrid){
		if(cookie.regisHybrid[i]!=false){
			cookie.regisHybrid[i].day = new Date(cookie.regisHybrid[i].day)
			var day = ['sat','sun','tue','thu']
			var dayNum = [6,0,2,4]
			for(k=0;k<4;k++){
				if(cookie.regisHybrid[i].day.getDay()==dayNum[k]){
					var j
					var hybridClass = document.getElementsByClassName('btn-'+day[k]+' '+cookie.regisHybrid[i].day.getHours()+'.1')
					for(j=0;j<hybridClass.length;j++){
						hybridClass[j].className = hybridClass[j].className+' hb';
						hybridClass[j].innerHTML = 'FHB : '+cookie.regisHybrid[i].subject;
					}
				}
			}
		}
	}
}

function back(){
	self.location = 'registrationHybrid'
}

function next(){
	var skPrint=''
	if($('#station').val()=='2'){
		skPrint+='MATH : สาย 3 '+'<br>'
	}
	else{
		if($("#skilltime").val()!='0'){
			skPrint+=$('#skillday').val()+' '+$("#skilltime option:selected").html()+' น. : MATH <br>'	
		}
	}
	if($('#stationEng').val()=='2'){
		skPrint+='ENG : สาย 3 '+'<br>'
	}
	else{
		if($("#skilltimeEng").val()!='0'){
			skPrint+=$('#skilldayEng').val()+' '+$("#skilltimeEng option:selected").html()+' น. : ENG <br>'
		}
	}
	$('#sk').html(skPrint)
	if($('#hb').html().length == 0){
		$('#hb').html('ไม่ลงทะเบียนในระบบ FHB')
	}
	if($('#sk').html().length == 0){
		$('#sk').html('ไม่ลงทะเบียนในระบบ SKILL')
	}
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function daytoNum(day) {
    switch (day) {
        case 'sun':
            return 0;
        case 'mon':
            return 1;
        case 'tue':
            return 2;
        case 'wed':
            return 3;
        case 'thu':
            return 4;
        case 'fri':
            return 5;
        case 'sat':
            return 6
    }
}
function numtoDay(num) {
    switch (num) {
        case 0:
            return 'sun';
        case 1:
            return 'mon';
        case 2:
            return 'tue';
        case 3:
            return 'wed';
        case 4:
            return 'thu';
        case 5:
            return 'fri';
        case 6:
            return 'sat'
    }
}
function gradetoText(grade) {
    if (grade <= 6) {
        return "ประถม " + grade;
    } else {
        return "มัธยม " + (grade - 6);
    }
}
function fullHBname(name){
	if(name == 'M'){
		return 'MATH'
	}
	if(name == 'PH'){
		return 'PHYSICS'
	}
}
function submit(){

}