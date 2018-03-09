<?php

function generate_feed_json() {
  $pages = page('feed')->children()->visible();
  $items = array();

  foreach($pages as $page) {
    $item = array();
    $item['title'] = $page->title()->value();
    $item['type'] = $page->intendedTemplate();

    switch ($page->intendedTemplate()) {
      case 'feed--live':
        $item['date'] = $page->show_date()->value();
        $item['link'] = $page->tickets()->isNotEmpty() ? (string) $page->tickets()->url() : null;
        break;
      case 'feed--news':
        $item['text'] = (string) $page->text()->kt();
        $item['slug'] = (string) $page->slug();
        break;
      case 'feed--shop':
        $item['link'] = (string) $page->shop_link()->url();
        break;
      case 'feed--video':
        $item['text'] = $page->text()->isNotEmpty() ? (string) $page->text()->kt() : null;
        $item['slug'] = (string) $page->slug();
        break;
      default:
        break;
    }

    array_push($items, (object) $item);
  }

  
  $json = (object) [
    'items' => $items,
  ];

  return $json;
}



function generate_page_json($page) {
  $item = array();
  $item['title'] = $page->title()->value();
  $item['type'] = $page->intendedTemplate();
  $item['slug'] = (string) $page->slug();
  $item['text'] = $page->text()->isNotEmpty() ? (string) $page->text()->kt() : null;

  switch ($page->intendedTemplate()) {
      case 'feed--news':
        $item['embeds'] = array();
        foreach ($page->embeds()->toStructure() as $embed) {
          array_push($item['embeds'], $embed->embedcode()->value());
        }
        break;
      default:
        break;
    }

  return (object) $item;
}




kirby()->set('route', array(
    'pattern' => 'api/initial-data',
    'action'  => function() {
        $title = (string) site()->title()->value();
        $description = (string) site()->description()->value();
        $about = (string) page('about')->text()->kt();
        
        $contactPage = page('contact');
        $contact = [
          'instagram' => $contactPage->instagram()->isNotEmpty() ? (string) $contactPage->instagram()->url() : null,
          'twitter' => $contactPage->twitter()->isNotEmpty() ? (string) $contactPage->twitter()->url() : null,
          'facebook' => $contactPage->facebook()->isNotEmpty() ? (string) $contactPage->facebook()->url() : null,
          'vimeo' => $contactPage->vimeo()->isNotEmpty() ? (string) $contactPage->vimeo()->url() : null,
          'youtube' => $contactPage->youtube()->isNotEmpty() ? (string) $contactPage->youtube()->url() : null,
          'bandcamp' => $contactPage->bandcamp()->isNotEmpty() ? (string) $contactPage->bandcamp()->url() : null,
          'emails' => array(),
        ];

        // $emails = array();
        foreach ($contactPage->emails()->toStructure() as $email) {
          array_push($contact['emails'], (object) [
            'name' => $email->name()->value(),
            'emailaddress' => $email->emailaddress()->value(),
          ]);
        }

        $json = (object) [
          'title' => $title,
          'description' => $description,
          'about' => (string) $about,
          'contact' => (object) $contact,
          'feed' => generate_feed_json(),
        ];

        if (site()->homePage()) {
          return response::json(json_encode($json));
        } else {
          return response::error($message = '404 Not found', $code = 404, $data = array($section));
        }
    }
));

kirby()->set('route', array(
    'pattern' => 'api/feed-items',
    'action'  => function() {
        return response::json(json_encode(generate_feed_json()));
    }
));

kirby()->set('route', array(
    'pattern' => 'api/page/(:any)',
    'action'  => function($slug) {
        $page = page('feed')->children()->find($slug);
        if (!$page) return response::error($message = '404 Not found', $code = 404);
        return response::json(json_encode(generate_page_json($page)));
    }
));

kirby()->set('route', array(
    'pattern' => array('(:any)', '(:any)/(:any)'),
    'action'  => function() {
      return page('home');
    },
));

