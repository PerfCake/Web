<?php
	$errors = '';
	$sent = false;

	// pseudo-security check
	if (empty($_POST['password'])) {
		return;
	} elseif ($_POST['password'] != 'perfCakeSecret123') {
		return;
	}

	$subject = $from = $message = '';
	if($_SERVER['REQUEST_METHOD'] == 'POST') {
		if (!empty($_POST['subject'])) $subject = htmlspecialchars($_POST['subject']);
		if (!empty($_POST['from'])) $from = htmlspecialchars($_POST['from']);
		if (!empty($_POST['message'])) $message = htmlspecialchars($_POST['message']);

		$extra = "From: PerfCake Web <$from>\r\nReply-To: $from\r\nContent-type: text/plain; charset=\"UTF-8\"\r\n";

		if (empty($from)) {
			$errors .= 'Please enter your email.<br />';
		} elseif (!filter_var($from, FILTER_VALIDATE_EMAIL)) {
			$errors .= "The specified email ($from) is invalid.<br />";
		}	
		if (empty($subject)) $errors .= 'Please enter the message subject.<br />';
		if (empty($message)) $errors .= 'Please enter the message body.<br />';
	    
	    if (empty($errors)) {
	    	if (@mail('marvenec@gmail.com,pavel.macik@gmail.com', $subject, $message, $extra)) {
	    		$sent = true;
				$errors .= 'Message sent successfuly.<br />';
			} else {
				$errors .= 'We are sorry but we were not able to send your message.';
			}
		}

	}

	$locationBase = 'https://www.perfcake.org/support/?';
	if ($sent) {
		$location = $locationBase.'subject='.urlencode($subject).
			'&from='.urlencode($from).'&message='.urlencode($message).'&errors='.urlencode($errors);
	} else {
		$location = $locationBase.'sent=true&errors='.urlencode($errors);
	}
	header('Location: '.$location, true, 302);
?>