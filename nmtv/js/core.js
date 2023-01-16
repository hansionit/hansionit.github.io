function stable($var) {
    $('#type').fadeOut(0);
    if ($var == 1) {
        $('#stable').fadeIn(0);
        $('#step1').fadeIn(500);
    } else {
        $('#beta').fadeIn(0);
        $('#beta_devices').fadeIn(500);
        // beta_devices();
    }
}

function beta_versions() {
    $.ajax({
        type: "GET",
        url: "api/beta/versions",
        dataType: "json",
        success: function (data) {
            if (data.error) {
                alert(data.error);
            } else {
                $('#beta_versions').children('.list').empty();
                $.each(data, function (i) {
                    var name = data[i]['os_version'];
                    console.log(name);
                    $('#beta_versions').children('.list').append("<div class=\"select-beta-devices-type\"> <div class=\"btn left big broad\"><a href=\"javascript:;\" onclick=\"beta_devices('" + name + "')\">" + name + "</a></div></div>");
                });
            }
        }
    });
}

function beta_devices_list($var) {
    $.ajax({
        type: "GET",
        url: "api/beta/devices/" + $var,
        dataType: "json",
        success: function (data) {
            if (data.error) {
                alert(data.error);
            } else {

                $('#beta_devices_list').fadeIn(500);

                $('#beta_devices').fadeOut(0);
                $('#beta_versions_list').fadeOut(0);
                $('#beta_firmwarm_info').fadeOut(0);

                $('#beta_devices_list').children('.list').empty();

                console.log("test");

                $.each(data, function (i) {
                    var name = data[i]['device_name'];
                    var show_name = data[i]['show_name'];
                    console.log(name);
                    $('#beta_devices_list').children('.list').append("<div class=\"select-beta-devices-type\"> <div class=\"btn left big broad\"><a href=\"javascript:;\" onclick=\"beta_versions_list('" + name + "')\">" + show_name + "</a></div></div>");
                });
            }
        }
    });
}

function beta_versions_list($var) {

    var device_name = $var;

    $.ajax({
        type: "GET",
        url: "api/beta/versions/" + $var,
        dataType: "json",
        success: function (data) {
            if (data.error) {
                alert(data.error);
            } else {

                $('#beta_versions_list').fadeIn(500);

                $('#beta_devices').fadeOut(0);
                $('#beta_devices_list').fadeOut(0);
                $('#beta_firmwarm_info').fadeOut(0);

                $('#beta_versions_list').children('.list').empty();

                $.each(data, function (i) {
                    var name = data[i]['os_version'];
                    console.log(name);
                    $('#beta_versions_list').children('.list').append("<div class=\"select-beta-devices-type\"> <div class=\"btn left big broad\"><a href=\"javascript:;\" onclick=\"beta_firmware_info('" + device_name + "','" + name + "')\">" + name + "</a></div></div>");
                });
            }
        }
    });
}

function beta_firmware_info($var, $var2) {
    var parms = { "device_name" : $var, "os_version": $var2};
    $.ajax({
        type: "POST",
        url: "api/beta/firmwares",
        data: parms,
        dataType: "json",
        success: function (data) {
            if (data.error) {
                alert(data.error);
            } else {

                $('#beta_firmwarm_info').fadeIn(500);

                $('#beta_devices').fadeOut(0);
                $('#beta_devices_list').fadeOut(0);
                $('#beta_versions_list').fadeOut(0);

                $('#beta_details_ul').empty();

                var info = {
                    "show_name": "设备",
                    "os_version": "版本",
                    "build_id": "Build ID",
                    "pub_date": "发布时间"
                };

                data = data[0];

                var $ul = $('.details').children('ul');
                $.each(info, function (key, value) {
                    $ul.append("<li>" + value + ": " + data[key] + "</li>");
                });

                var $is_cow_empty = data['cow_url'];
                // var $is_od_empty = data['od_url'];

                console.log($is_cow_empty);
                // console.log($is_od_empty);

                // if ($is_od_empty != null) {
                //     $("#dl_od_beta").attr("href", data['od_url']);
                //     $("#dl_od_beta").parent('div').attr("class", "btn download active");
                // } else {
                //     $("#dl_od_beta").attr("href", null);
                //     $("#dl_od_beta").attr("onclick", "alert('没有上传完毕呢，再稍等等吧。')");
                //     $("#dl_od_beta").parent('div').attr("class", "btn download stopped");
                // }

                if ($is_cow_empty != "NULL") {
                    $("#dl_cow_beta").attr("href", data['cow_url']);
                    $("#dl_cow_beta").parent('div').attr("class", "btn download active");
                } else {
                    $("#dl_cow_beta").attr("href", null);
                    $("#dl_cow_beta").attr("onclick", "alert('没有上传完毕呢，再稍等等吧。')");
                    $("#dl_cow_beta").parent('div').attr("class", "btn download stopped");
                }

                $("#dl_beta").attr("href", data['apple_url']);

                var isMobile = false;

                // 检测userAgent
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    isMobile = true;
                }

                if (isMobile) {
                    $("#dl_beta").attr("href", "javascript:;");
                    $("#dl_beta").attr("data-clipboard-text", data['apple_url']);
                    $("#dl_beta").html("复制下载链接")
                } else {
                    $("#dl_beta").attr("href", data['apple_url']);
                }
            }
        }
    });
}

function device($var) {
    $('#step2').removeClass();
    $('#step2').addClass($var);
    $.ajax({
        type: "GET",
        url: "api/" + $var + "/condensed",
        dataType: "json",
        success: function (data) {
            if (data.error) {
                alert(data.error);
            } else {
                $('#step1').fadeOut(0);
                $('#step2').fadeIn(500);
                $('#step2').children('.list').empty();
                $.each(data, function (i) {
                    var show_name = data[i]['show_name'];
                    var id = data[i]['identifier'];
                    $('#step2').children('.list').append("<div class=\"select-devices-type\"><div class=\"btn left big broad\"><a href=\"javascript:;\" onclick=\"identifier('" + id + "')\" id=\"identifier_" + id + "\">" + show_name + "</a></div></div>");
                });
            }
        }
    });
}

function identifier($var) {
    $.ajax({
        type: "GET",
        url: "api/" + $var + "/index/signing",
        dataType: "json",
        success: function (data) {
            if (data.error) {
                alert(data.error);
            } else {
                $('#step2').fadeOut(0);
                $('#step3').fadeIn(500);
                $('#step3').children('.list').empty();
                $.each(data, function (key, value) {
                    if (value['signing'] == 1) {
                        var $sign = 'signing'
                    } else {
                        var $sign = 'stopped'
                    }
                    $('#step3').children('.list').append("<div class=\"btn left big narrow " + $sign + "\"><a href=\"javascript:;\" onclick=\"firmware('" + $var + "','" + key + "')\" id=\"identifier_" + key + "\">" + value['version'] + "</a></div>");
                });
            }
        }
    });
}

function firmware($identifier, $buldid) {
    $.ajax({
        type: "GET",
        url: "api/" + $identifier + "/" + $buldid + "/condensed",
        dataType: "json",
        success: function (data) {
            if (data.error) {
                alert(data.error);
            } else {
                $('#step3').fadeOut(0);
                $('.info').fadeIn(500);
                $('#details_ul').empty();
                var info = {
                    "show_name": "设备",
                    "identifier": "标识符",
                    "version": "版本",
                    "buildid": "Build ID",
                    "uploaddate": "上传时间",
                    "releasedate": "发布时间",
                    "size": "文件大小",
                    "md5sum": "MD5sum",
                    "sha1sum": "SHA1sum"
                };
                if (!data.hasOwnProperty("releasedate")) {
                    delete info['releasedate'];
                }
                data['size'] = bytesToSize(data['size']);
                var $ul = $('.details').children('ul');
                $.each(info, function (key, value) {
                    $ul.append("<li>" + value + ": " + data[key] + "</li>");
                });
                var isMobile = false;
                // 检测userAgent
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    isMobile = true;
                }
                if (isMobile) {
                    $("#downloadlink").attr("href", "javascript:;");
                    $("#downloadlink").attr("data-clipboard-text", data['url']);
                    $("#downloadlink").html("复制下载链接")
                } else {
                    $("#downloadlink").attr("href", data['url']);
                }
                var $cp = $(".compatibility");
                var $ok = $cp.children(".ok");
                var $no = $cp.children(".no");
                $ok.hide();
                $no.hide();
                if (data['signing'] == 1) {
                    $ok.show();
                } else {
                    $no.show();
                }
            }
        }
    });
}

function previous_step($var) {
    $('#type').fadeOut(0);
    $('#step1').fadeOut(0);
    $('#step2').fadeOut(0);
    $('#step3').fadeOut(0);
    $('.info').fadeOut(0);
    $('#beta_devices').fadeOut(0);
    $('#beta_devices_list').fadeOut(0);
    $('#beta_versions_list').fadeOut(0);
    $('#beta_firmwarm_info').fadeOut(0);


    switch ($var) {
        case 0:
            $id = 'type';
            break;
        case 1:
            $id = 'step1';
            break;
        case 2:
            $id = 'step2';
            break;
        case 3:
            $id = 'step3';
            break;
        case 4:
            $id = 'beta_devices';
            break;
        case 5:
            $id = 'beta_devices_list';
            break;
        case 6:
            $id = 'beta_versions_list';
            break;
        case 7:
            $id = 'beta_firmwares_info';
            break;
    }
    $('#' + $id).fadeIn(0);

}

$(document).ready(function () {
    var clipboard = new ClipboardJS('#downloadlink');
    clipboard.on('success', function (e) {
        console.log(e);
        alert('下载链接已拷贝到您的剪切板啦，用电脑下载然后刷机吧~')
    });
    clipboard.on('error', function (e) {
        console.log(e);
        alert("复制失败")
    });

    $("#follow_on_wechat").attr("href", "javascript:;");
    $("#follow_on_wechat").attr("data-clipboard-text", "iamibeta");

    var clipboard_follow_on_wechat = new ClipboardJS('#follow_on_wechat');
    clipboard_follow_on_wechat.on('success', function (e) {
        console.log(e);
        alert('公众号 ID 已拷贝到您的剪切板啦，去微信粘贴搜索吧~')
    });
    clipboard_follow_on_wechat.on('error', function (e) {
        console.log(e);
        alert("复制失败")
    });

    var clipboard2 = new ClipboardJS('#dl_beta');
    clipboard2.on('success', function (e) {
        console.log(e);
        alert('下载链接已拷贝到您的剪切板啦，用电脑下载然后刷机吧~')
    });
    clipboard2.on('error', function (e) {
        console.log(e);
        alert("复制失败")
    });
});

function bytesToSize(bytes) {
    if (bytes === 0) return '0 B';

    var k = 1024;

    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];                                                                                                       //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

function elementPosition(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        curleft = obj.offsetLeft;
        curtop = obj.offsetTop;
        while (obj = obj.offsetParent) {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        }
    }
    return {x: curleft, y: curtop};
}

function ScrollToControl(id) {
    var elem = document.getElementById(id);
    var scrollPos = elementPosition(elem).y;
    var heightTop = document.documentElement.scrollTop || document.body.scrollTop;
    scrollPos = scrollPos - heightTop - 70;
    var remainder = scrollPos % 50;
    var repeatTimes = (scrollPos - remainder) / 50;
    ScrollSmoothly(scrollPos, repeatTimes);
    window.scrollBy(0, remainder);
}

var repeatCount = 0;
var cTimeout;

function ScrollSmoothly(scrollPos, repeatTimes) {
    if (repeatCount < repeatTimes) {
        window.scrollBy(0, 50);
    }
    else {
        repeatCount = 0;
        clearTimeout(cTimeout);
        return;
    }
    repeatCount++;
    cTimeout = setTimeout("ScrollSmoothly('" + scrollPos + "','" + repeatTimes + "')", 50);
}

function install_profile($model) {
    // 慢慢的拼凑 拼凑成一个完全不属于自己的我
    var url = "http://" + window.location.host + "/Install/" + $model;
    if ($model == "tvOS12" || $model == "tvOS13") {
        var copy_tvos_text = "https://iBeta.me/install/" + $model;
        $("#" + $model).attr("href", "javascript:;");
        $("#" + $model).attr("data-clipboard-text", copy_tvos_text);
        var clipboard = new ClipboardJS("#" + $model);
        clipboard.on('success', function (e) {
            console.log(e);
        });
        clipboard.on('error', function (e) {
            console.log(e);
        });
    }
    window.open(url, "_blank");
}

$(function () {
    $('#appCardLoadMore').bind('click', function () {
        $('.card-app-unshow-more').attr("class", "app-card-item card-app-show-more");
        $('#appCardLoadMore').fadeOut(0.5);
        $('#appCardLoadLess').fadeIn(0.5);
    });
});

$(function () {
    $('#appCardLoadLess').bind('click', function () {
        $('.card-app-show-more').attr("class", "app-card-item card-app-unshow-more");
        $('#appCardLoadLess').fadeOut(0.5);
        $('#appCardLoadMore').fadeIn(0.5);
    });
});
