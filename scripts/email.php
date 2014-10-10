<?php
	$errors = '';

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

		$extra = "From: Web Form <$from>\r\nReply-To: $from\r\nContent-type: text/plain; charset=\"UTF-8\"\r\n";

		if (empty($from)) {
			$errors .= 'Please enter your email.<br />';
		} elseif (!filter_var($from, FILTER_VALIDATE_EMAIL)) {
			$errors .= "The specified email ($from) is invalid.<br />";
		}	
		if (empty($subject)) $errors .= 'Please enter the message subject.<br />';
		if (empty($message)) $errors .= 'Please enter the message body.<br />';
	    
	    if (empty($errors)) {
	    	if (@mail('marvenec@gmail.com', $subject, $message, $extra)) {
				$errors .= 'Message sent successfuly.<br />';
			} else {
				$errors .= 'We are sorry but we were not able to send your message.';
			}
		}

	}

	header('Location: https://www.perfcake.org/support/?errors=' . urlencode($errors), true, 302);
?>